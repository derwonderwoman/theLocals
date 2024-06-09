import { db, mailSender} from "../index";
import dotenv from "dotenv";
import { Recipient, EmailParams, Sender } from "mailersend";

dotenv.config();

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
            if (status === "approved") {
                const specialist = await db("applications")
                  .select("specialists.email")
                  .where("applications.id", orderId)
                  .join("specialists", "specialists.id", "applications.specialist_id")
                  .first();
                console.log(specialist);
          
                if (specialist) {
                  const recipients = [new Recipient(specialist.email, specialist.first_name)];
          
                  const emailParams = new EmailParams()
                    .setFrom(new Sender(process.env.EMAIL as string, "theLocals"))
                    .setTo(recipients)
                    .setSubject("Your application status has changed")
                    .setText(
                      "Dear specialist, there's a new order you might be interested in, you can get his phone number after approval. Please check your dashboard for more details.Here is the link to log in: https://thelocals-fe.onrender.com/#/specialist/login"
                    );
          
                  mailSender.email.send(emailParams)
                   .catch(error => console.log(error));
                }
              }

/////

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