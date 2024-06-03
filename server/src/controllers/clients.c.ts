import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { register, login } from "../models/clients.js";
import { nanoid } from "nanoid";

dotenv.config();

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY } = process.env;

interface DecodedToken {
    id: string;
    email: string;
}

interface ClientData {
    id: number | string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    town: string;
    phone_number: string;
    year_of_birth: number;
}

interface ResponseClientData {
    id: number | string;
    email: string;
    first_name: string;
    last_name: string;
    town: string;
    phone_number: string;
    year_of_birth: number;
}
export const _login_client = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password }: { email: string; password: string } = req.body;
        const client: ClientData = await login(email.toLowerCase());

        if (!client) {
            res.status(404).json({ msg: "Email not found" });
            return;
        }

        const isMatch: boolean = bcrypt.compareSync(password, client.password);

        if (!isMatch) {
            res.status(404).json({ msg: "Wrong password" });
            return;
        }

        const accessToken: string = jwt.sign({ id: client.id, email: client.email }, ACCESS_TOKEN_SECRET!, {
            expiresIn: ACCESS_TOKEN_EXPIRY
        });

        const decodedToken: DecodedToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET!) as DecodedToken;

        console.log(decodedToken.id);
        console.log(decodedToken.email);

        res.cookie("token", accessToken, {
            httpOnly: true,
            maxAge: 60 * 1000 
        });

        res.json({ token: accessToken, type: "client" });
    } catch (error) {
        console.error("_login", error);
        res.status(500).json({ msg: "login failed" });
    }
};

export const _register_client = async (req: Request, res: Response): Promise<void> => {
    const { first_name, last_name, town, phone_number, year_of_birth, email, password }: ClientData = req.body;
    
    try {
        const lowerEmail: string = email.toLowerCase();

        const salt: string = bcrypt.genSaltSync(10);
        const hashPassword: string = bcrypt.hashSync(password, salt);

        const newID: string = nanoid();

        const newClientData: ClientData = {
            id: newID,
            email: lowerEmail,
            password: hashPassword,
            first_name,
            last_name,
            town,
            phone_number,
            year_of_birth
        };
        
        const newClient: ClientData = await register(newClientData);

        const newResponseClient: ResponseClientData = {
            id: newID,
            email: lowerEmail,
            first_name,
            last_name,
            town,
            phone_number,
            year_of_birth
        };

        res.json(newResponseClient);
    } catch (error) {
        console.error("_register", error);
        res.status(500).json({ msg: "registration failed" });
    }
};


// import { register, login} from "../models/clients.js"
// import bcrypt from "bcrypt";
// import dotenv from "dotenv";
// import jwt from "jsonwebtoken";
// dotenv.config();

// const {ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY} = process.env;

// interface ClientData {
//     email: string;
//     password: string;
//     first_name: string;
//     last_name: string;
//     town: string;
//     phone_number: string; 
//     year_of_birth: number;
// }

// export const _login_client = async(req, res) => {
//     try {
//         const {email, password} = req.body;
//         const client = await login(email.toLowerCase());

//         if(!client) return res.status(404).json({msg: "Email not found"})

//         const isMatch = bcrypt.compareSync(password+ "", client.password);
//         if(!isMatch) return res.status(404).json({msg: "Wrong password"})

//         const accessToken = jwt.sign({id: client.id, email: client.email},
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

// export const _register_client = async (req, res) => {
//     const{first_name, last_name, town, phone_number, year_of_birth, email, password} = req.body;
//     try{
//         const loweremail: string = email.toLowerCase();

//         const salt : string = bcrypt.genSaltSync(10);
//         const hashpassword : string = bcrypt.hashSync(password + "", salt);

//         const newClientData: ClientData = {
//             email: loweremail,
//             password: hashpassword,
//             first_name: first_name,
//             last_name: last_name,
//             town: town,
//             phone_number: phone_number,
//             year_of_birth: year_of_birth
//         };
        
//         const newClient = await register(newClientData);
//         res.json(newClient)
//     }catch(error) {
//         console.log("_register=>", error);
//         res.status(404).json({msg:"email exist"});
//     }
// }