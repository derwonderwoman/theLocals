"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._register_spec = exports._login_spec = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
var specialists_1 = require("../models/specialists");
var nanoid_1 = require("nanoid");
dotenv_1.default.config();
var _a = process.env, ACCESS_TOKEN_SECRET = _a.ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY = _a.ACCESS_TOKEN_EXPIRY;
var _login_spec = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, specialist, isMatch, accessToken, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, (0, specialists_1.login)(email.toLowerCase())];
            case 1:
                specialist = _b.sent();
                if (!specialist) {
                    res.status(404).json({ msg: "Email not found" });
                    return [2 /*return*/];
                }
                isMatch = bcrypt_1.default.compareSync(password, specialist.password);
                if (!isMatch) {
                    res.status(404).json({ msg: "Wrong password" });
                    return [2 /*return*/];
                }
                accessToken = jsonwebtoken_1.default.sign({ id: specialist.id, email: specialist.email }, ACCESS_TOKEN_SECRET, {
                    expiresIn: ACCESS_TOKEN_EXPIRY
                });
                res.cookie("token", accessToken, {
                    httpOnly: true,
                    maxAge: 60 * 1000
                });
                res.json({ token: accessToken });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.error("_login", error_1);
                res.status(404).json({ msg: "login failed" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports._login_spec = _login_spec;
var _register_spec = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, first_name, last_name, town, phone_number, year_of_birth, email, password, specialisation, loweremail, salt, hashpassword, newID, newSpecData, newSpec, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, first_name = _a.first_name, last_name = _a.last_name, town = _a.town, phone_number = _a.phone_number, year_of_birth = _a.year_of_birth, email = _a.email, password = _a.password, specialisation = _a.specialisation;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                loweremail = email.toLowerCase();
                salt = bcrypt_1.default.genSaltSync(10);
                hashpassword = bcrypt_1.default.hashSync(password, salt);
                newID = (0, nanoid_1.nanoid)();
                newSpecData = {
                    id: newID,
                    email: loweremail,
                    password: hashpassword,
                    first_name: first_name,
                    last_name: last_name,
                    town: town,
                    phone_number: phone_number,
                    year_of_birth: year_of_birth,
                    specialisation: specialisation,
                };
                return [4 /*yield*/, (0, specialists_1.register)(newSpecData)];
            case 2:
                newSpec = _b.sent();
                res.json(newSpec);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.error("_register", error_2);
                res.status(404).json({ msg: "registration failed" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports._register_spec = _register_spec;
// import { register, login} from "../models/specialists.ts"
// import bcrypt from "bcrypt";
// import dotenv from "dotenv";
// import jwt from "jsonwebtoken";
// dotenv.config();
// const {ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY} = process.env;
// interface SpecialistData {
//     email: string;
//     password: string;
//     first_name: string;
//     last_name: string;
//     town: string;
//     phone_number: string; 
//     year_of_birth: number;
//     specialisation: string;
// }
// export const _login_spec = async(req, res) => {
//     try {
//         const {email, password} = req.body;
//         const specialist = await login(email.toLowerCase());
//         if(!specialist) return res.status(404).json({msg: "Email not found"})
//         const isMatch = bcrypt.compareSync(password+ "", specialist.password);
//         if(!isMatch) return res.status(404).json({msg: "Wrong password"})
//         const accessToken = jwt.sign({id: specialist.id, email: specialist.email},
//             ACCESS_TOKEN_SECRET,
//             {
//                 expiresIn: ACCESS_TOKEN_EXPIRY
//             });
//         res.cookie("token", accessToken, {
//             httpOnly:true,
//             maxAge: 60 * 1000
//         })
//         res.json({token: accessToken})
//     } catch(error) {
//         console.log("_login", error);
//         res.status(404).json({msg: "login failed"});
//     }
// }
// export const _register_spec = async (req, res) => {
//     const{first_name, last_name, town, phone_number, year_of_birth, email, password, specialisation} = req.body;
//     try{
//         const loweremail: string = email.toLowerCase();
//         const salt : string = bcrypt.genSaltSync(10);
//         const hashpassword : string = bcrypt.hashSync(password + "", salt);
//         const newSpecData: SpecialistData = {
//             email: loweremail,
//             password: hashpassword,
//             first_name: first_name,
//             last_name: last_name,
//             town: town,
//             phone_number: phone_number,
//             year_of_birth: year_of_birth,
//             specialisation: specialisation,
//         };
//         const newSpec = await register(newSpecData);
//         res.json(newSpec)
//     }catch(error) {
//         console.log("_register=>", error);
//         res.status(404).json({msg:"email exist"});
//     }
// }
