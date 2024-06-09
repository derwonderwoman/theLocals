import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { register, login, application, orderslist,updateApplicationStatustoApprove, deleteOrder, editOrder, getClientOrders} from "../models/clients.js";
import { stat } from "fs/promises";

dotenv.config();

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY } = process.env;

interface ApplicationController {
    id?: number;
    client_id: number;
    town:string;
    specialisation:string;
    date:Date;
    time:string;
    rate_per_hour:number;
    status:string;
};

export interface DecodedToken extends jwt.JwtPayload {
    id?: string;
    email?: string;
  }

interface ClientData {
    id?: number;
    email: string;
    password: string;
    gender: string;
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

        res.json({ token: accessToken, type: "client", first_name: client.first_name, id: client.id, email:client.email, town:client.town, last_name: client.last_name });
    } catch (error) {
        console.error("_login", error);
        res.status(500).json({ msg: "login failed" });
    }
};

export const _register_client = async (req: Request, res: Response): Promise<void> => {
    const { first_name, last_name, town, phone_number, year_of_birth, email, password, gender }: ClientData = req.body;
    
    try {
        const lowerEmail: string = email.toLowerCase();

        const salt: string = bcrypt.genSaltSync(10);
        const hashPassword: string = bcrypt.hashSync(password, salt);

        const newClientData: ClientData = {
            email: lowerEmail,
            password: hashPassword,
            first_name,
            gender,
            last_name,
            town,
            phone_number,
            year_of_birth
        };
        
        const newClient: ClientData = await register(newClientData);

        res.json(newClient);
    } catch (error) {
        console.error("_register", error);
        res.status(500).json({ msg: "registration failed" });
    }
};


export const _createApplication = async (req: Request, res: Response): Promise<void> => {
    const {id, town, specialisation, date, time, rate_per_hour, status = "pending" , client_id}: ApplicationController = req.body;
  
    try {

        const newApplication: ApplicationController = {
            id,
            client_id,
            town,
            specialisation,
            date,
            time,
            rate_per_hour,
            status,
        };

        const myApp: ApplicationController = await application(newApplication);
        res.json(myApp);
    } catch (error) {
        console.error("_application", error);
        res.status(500).json({ error1: "Application failed: ", error });
    }
};

export const getOrders = async (req: Request, res: Response) => {
    try {
      const orders = await orderslist();
      res.json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  };

  export const _getClientOrders = async (req: Request, res: Response) => {
    try {
        const clientId: number = parseInt(req.params.id);
        const orders = await getClientOrders(clientId);
        res.json(orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
      }
    };


  export const _updateApplicationStatustoApprove = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, client_id } = req.body;
    try {
        await updateApplicationStatustoApprove(parseInt(id), status, parseInt(client_id));
        res.json({ message: 'Application status updated successfully' });
    } catch (error) {
        console.error('Error updating:', error);
        res.status(500).json({ error: 'Failed to update application status' });
    }
};

export const _deleteOrder = async (req: Request, res: Response): Promise<void> => {
    const orderId: number = parseInt(req.params.id);

    try {
        await deleteOrder(orderId);
        res.status(204).send(); 
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Failed to delete order' }); 
    }
};

export const _editOrder = async (req: Request, res: Response): Promise<void> => {
    const orderId: number = parseInt(req.params.id);
    const {date} = req.body;
    try {
        await editOrder(orderId, date);
        res.status(200).send();
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Failed to update order' }); 
    }
};