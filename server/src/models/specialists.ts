import { db } from "../index";

interface SpecialistData {
    first_name: string;
    last_name: string;
    town: string;
    gender: string;
    phone_number: string;
    year_of_birth: number;
    email: string;
    password: string;
    specialisation: string;
}

interface Specialist {
    id: string | number;
    first_name: string;
    last_name: string;
    town: string;
    gender: string;
    phone_number: string;
    year_of_birth: number;
    email: string;
    password: string;
    specialisation: string;
}

export const register = async ({
    first_name,
    last_name,
    town,
    phone_number,
    year_of_birth,
    email,
    password,
    specialisation,
    gender
}: SpecialistData): Promise<Specialist> => {
    try {
        const [specialist]: Specialist[] = await db("specialists").insert({
            first_name,
            last_name,
            town,
            phone_number,
            gender,
            year_of_birth,
            email,
            password,
            specialisation
        }, [
            "first_name",
            "last_name",
            "town",
            "gender",
            "phone_number",
            "year_of_birth",
            "email",
            "password",
            "specialisation"
        ]);

        return specialist;
    } catch (error) {
        console.error(error);
        throw new Error('registration error');
    }
}

export const login = async (email: string): Promise<Specialist | undefined> => {
    try {
        const specialist: Specialist | undefined = await db("specialists")
            .select("id", "email", "password")
            .where({ email })
            .first();

        return specialist;
    } catch (error) {
        console.error(error);
        throw new Error("login error");
    }
}