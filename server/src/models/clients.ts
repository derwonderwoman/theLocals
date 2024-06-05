import { db } from "../index";

interface Application {
    client_id: number | string;
    town:string;
    specialisation:string;
    date:Date;
    time:string;
    rate_per_hour:number;
    status:string;
}

interface ClientData {
    first_name: string;
    last_name: string;
    town: string;
    phone_number: string;
    year_of_birth: number;
    email: string;
    password: string;
    gender: string;
}

interface Order {
    id: string | number;
    status: string;
}

interface Client {
    id: string | number;
    first_name: string;
    last_name: string;
    town: string;
    phone_number: string;
    year_of_birth: number;
    email: string;
    password: string;
    gender: string;
}

export const register = async ({
    first_name,
    last_name,
    town,
    phone_number,
    year_of_birth,
    email,
    password,
    gender,
}: ClientData): Promise<Client> => {
    try {
        const [client]: Client[] = await db("clients").insert({
                first_name,
                last_name,
                town,
                phone_number,
                year_of_birth,
                email,
                password,
                gender
            }, [
                "first_name",
                "last_name",
                "gender",
                "town",
                "phone_number",
                "year_of_birth",
                "email",
                "password"
            ]);

        return client;
    } catch (error) {
        console.error(error);
        throw new Error('registration error');
    }
}

export const login = async (email: string): Promise<Client> => {
    try {
        const client: Client = await db("clients")
            .select("id", "email", "password", "first_name")
            .where({ email })
            .first();

        return client;
    } catch (error) {
        console.error(error);
        throw new Error("login error");
    }
}

export const application = async ({
    client_id,
    town,
    specialisation,
    date,
    time,
    rate_per_hour,
    status
}: Application): Promise<Application> => {
    try {
        const [application]: Application[] = await db("applications").insert({
                client_id,
                town,
                specialisation,
                date,
                time,
                rate_per_hour,
                status
            }, [
                "client_id",
                "specialisation",
                "date",
                "time",
                "town",
                "rate_per_hour",
                "status"
            ]);

        return application;
    } catch (error) {
        console.error(error);
        throw new Error('application error');
    }
}

// export const orderStatus = async ({}): Promise<Client> => {
//     try {
        
//     } catch (error) {
//         console.error(error);
//         throw new Error("orderStatus error");
//     }
// }

