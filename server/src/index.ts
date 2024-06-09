import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import knex from "knex";
import client_router from "./routers/clients.r";
import spec_router from "./routers/specialists.r";
// import { google } from 'googleapis';
// import axios from "axios";
// import nodemailer from "nodemailer";
// import { OAuth2Client } from 'google-auth-library';
import {MailerSend} from "mailersend"


export const mailSender = new MailerSend({
    apiKey: process.env.MAILER_API_KEY as string,
});

dotenv.config();

// const tokenEndpoint = 'https://oauth2.googleapis.com/token';

// const oAuth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.REDIRECT_URI
// );

// const authUrl = oAuth2Client.generateAuthUrl({
//   access_type: 'offline',
//   scope: process.env.SCOPE,
//   redirect_uri: process.env.REDIRECT_URI  
// });

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

// export const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     type: 'OAuth2',
//     user: process.env.EMAIL,
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     refreshToken: 'default_refresh_token',
//     accessToken: 'default_access_token',
//   },
// });

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.URL,
    credentials:true,
}));

// app.get("/auth/google", (req, res) => {
//   res.redirect(authUrl);
// });

// app.get("/auth/google/callback", async (req, res) => {
//   const code = req.query.code ? req.query.code.toString() : null;
//   if (!code) {
//     res.status(400).send("Authorization code is missing.");
//     return;
//   }
//   try {
//     const response = await axios.post(tokenEndpoint, {
//       code: code,
//       client_id: process.env.CLIENT_ID,
//       client_secret: process.env.CLIENT_SECRET,
//       redirect_uri: process.env.REDIRECT_URI,
//       grant_type: 'authorization_code'
//     });
//     const tokens = response.data;
//     oAuth2Client.setCredentials(tokens);
//     const accessToken = tokens.access_token; 
//     const refreshToken = tokens.refresh_token;

//     transporter.set('auth', {
//       type: 'OAuth2',
//       user: process.env.EMAIL,
//       clientId: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       refreshToken: refreshToken,
//       accessToken: accessToken, 
//     });

//     res.send("Authentication successful!");
//   } catch (error) {
//     console.error("Error exchanging authorization code for tokens:", error);
//     res.status(500).send("Error exchanging authorization code for tokens");
//   }
// });


// app.get("/logout", (req, res) => {
//   res.clearCookie("authToken"); 
//   res.redirect("/login"); 
// });
app.use("/client", client_router);
app.use("/specialist", spec_router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});