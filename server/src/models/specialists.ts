import { db } from "../index";

interface Order {
    id:number;
    date: Date;
    time: string;
    rate_per_hour: number;
    town: string;
    first_name: string;
    last_name: string;
}

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
    id: number;
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
            "id",
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
            .select("id", "email", "password", "first_name", "last_name", "specialisation")
            .where({ email })
            .first();

        return specialist;
    } catch (error) {
        console.error(error);
        throw new Error("login error");
    }
}

export const newOrders = async (id: number): Promise<Order[]> => {
    try {
        const orders: Order[] = await db('applications')
            .select('applications.id','applications.date', 'applications.time', 'applications.rate_per_hour', 'applications.town', 'clients.first_name', 'clients.last_name')
            .join('clients', 'applications.client_id','clients.id')
            .where('applications.status', '=', 'pending')
            .andWhere('applications.specialisation', db('specialists').select('specialisation').where('id', id).first());
        return orders;
    } catch (error) {
        console.error('Error fetching pending orders:', error);
        throw new Error('Failed to fetch pending orders');
    }
};

export const getAllApplications = async () => {
    try {
        const applications = await db
            .select([
                'applications.id',
                'applications.date',
                'applications.specialisation',
                'applications.status',
                'clients.first_name as client_first_name',
                'clients.last_name as client_last_name',
                'specialists.first_name as specialist_first_name',
                'specialists.last_name as specialist_last_name'
            ])
            .from('applications')
            .leftJoin('clients', 'applications.client_id', 'clients.id')
            .leftJoin('specialists', 'applications.specialist_id', 'specialists.id');

        return applications;
    } catch (error) {
        console.error('Error fetching applications:', error);
        throw new Error('Failed to fetch applications');
    }
};

export const getApplication = async (orderId:number) => {
    try {
        const applications = await db('applications')
            .select([
                'applications.date',
                'applications.specialisation',
                'applications.status',
                'applications.id',
                'specialists.first_name AS specialist_first_name',
                'specialists.last_name AS specialist_last_name',
                'clients.first_name AS client_first_name',
                'clients.last_name AS client_last_name'
            ])
            .join('clients', 'applications.client_id', 'clients.id')
            .join('specialists', 'applications.specialist_id', 'specialists.id')
            .where('applications.id', orderId);

        return applications;
    } catch (error) {
        console.error('Error fetching applications:', error);
        throw new Error('Failed to fetch applications');
    }
};