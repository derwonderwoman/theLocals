import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { register, login, newOrders} from "../models/specialists";
import { orderslist } from "../models/clients";
dotenv.config();

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY } = process.env;

export interface DecodedToken extends jwt.JwtPayload {
    id?: string;
    email?: string;
  }

interface SpecialistData {
    id?: number;
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

        const newSpecData: SpecialistData = {
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


export const getNewOrders = async (req: Request, res: Response) => {
    try {
        const specID = req.query.specialistId;
        const orders = await newOrders(parseInt(specID as string));
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};