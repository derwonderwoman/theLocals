import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { register, login } from "../models/specialists";
import { nanoid } from "nanoid";
dotenv.config();

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY } = process.env;

interface DecodedToken {
    id: string;
    email: string;
}

interface SpecialistData {
    id: string | number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    gender:string;
    town: string;
    phone_number: string;
    year_of_birth: number;
    specialisation: string;
}

export const _login_spec = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password }: { email: string; password: string } = req.body;
        const specialist: SpecialistData | undefined = await login(email.toLowerCase());

        if (!specialist) {
            res.status(404).json({ msg: "Email not found" });
            return;
        }

        const isMatch: boolean = bcrypt.compareSync(password, specialist.password);

        if (!isMatch) {
            res.status(404).json({ msg: "Wrong password" });
            return;
        }

        const accessToken: string = jwt.sign({ id: specialist.id, email: specialist.email }, ACCESS_TOKEN_SECRET!, {
            expiresIn: ACCESS_TOKEN_EXPIRY
        });

        res.cookie("token", accessToken, {
            httpOnly: true,
            maxAge: 60 * 1000
        });

        res.json({ token: accessToken, type:"specialist" });
    } catch (error) {
        console.error("_login", error);
        res.status(404).json({ msg: "login failed" });
    }
};

export const _register_spec = async (req: Request, res: Response): Promise<void> => {
    const { first_name, last_name, town, phone_number, year_of_birth, email, password, specialisation, gender }: SpecialistData = req.body;
    try {
        const loweremail: string = email.toLowerCase();

        const salt: string = bcrypt.genSaltSync(10);
        const hashpassword: string = bcrypt.hashSync(password, salt);
        const newID: string = nanoid();

        const newSpecData: SpecialistData = {
            id: newID,
            email: loweremail,
            password: hashpassword,
            gender,
            first_name,
            last_name,
            town,
            phone_number,
            year_of_birth,
            specialisation,
        };

        const newSpec: SpecialistData = await register(newSpecData);
        res.json(newSpec);
    } catch (error) {
        console.error("_register", error);
        res.status(404).json({ msg: "registration failed" });
    }
};



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

