import { db } from "../index";

interface Application {
    id?: number;
    client_id: number;
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
            .select("id", "email", "password", "first_name", "town")
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
                "id",
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

export const orderslist = async () => {
    try {
      const orders = await db
        .select([
          'applications.date',
          'applications.specialisation',
          'applications.status',
          'applications.id',
          'specialists.first_name',
          'specialists.last_name',
          'specialists.phone_number'
        ])
        .from('applications')
        .leftJoin('specialists', 'applications.specialist_id', 'specialists.id');
  
      return orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw new Error('Failed to fetch orders');
    }
  };

  export const updateApplicationStatustoApprove = async (orderId: number, status: string, clientId: number): Promise<void> => {
    try {
        await db('applications')
            .update({
                status,
                client_id: clientId
            })
            .where('id', orderId);
    } catch (error) {
        console.error('Error updating application status:', error);
        throw new Error('Failed to update application status');
    }
};

export const deleteOrder = async (orderId: number): Promise<void> => {
    try {
        await db('applications').where('id', orderId).del();
    } catch (error) {
        console.error('Error deleting order:', error);
        throw new Error('Failed to delete order');
    }
};

export const editOrder = async (orderId: number, date: Date): Promise<void> => {
    try {
        await db('applications').where('id', orderId).update({date});
    } catch (error) {
        console.error('Error deleting order:', error);
        throw new Error('Failed to delete order');
    }
};