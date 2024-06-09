import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import knex from "knex";
import client_router from "./routers/clients.r";
import spec_router from "./routers/specialists.r";
import nodemailer from "nodemailer";
dotenv.config();


export const db = knex({
    client: "pg",
    connection: {
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      ssl: {rejectUnauthorized: false}
    },
  });

  export const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
},
});

  const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.URL,
    credentials:true,
}));

app.use("/client", client_router)
app.use("/specialist", spec_router)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});