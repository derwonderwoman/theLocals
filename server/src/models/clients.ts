import { db } from "../index";

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

interface Client {
    id: number;
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
        const [client]: Client[] = await db("clients")
            .insert({
                first_name,
                last_name,
                town,
                phone_number,
                year_of_birth,
                email,
                password,
                gender
            }, [
                "id",
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
            .select("id", "email", "password")
            .where({ email })
            .first();

        return client;
    } catch (error) {
        console.error(error);
        throw new Error("login error");
    }
}