"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var knex_1 = __importDefault(require("knex"));
var clients_r_1 = __importDefault(require("./routers/clients.r"));
var specialists_r_1 = __importDefault(require("./routers/specialists.r"));
dotenv_1.default.config();
exports.db = (0, knex_1.default)({
    client: "pg",
    connection: {
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        ssl: { rejectUnauthorized: false }
    },
});
var app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use("/clients", clients_r_1.default);
app.use("/specialists", specialists_r_1.default);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
