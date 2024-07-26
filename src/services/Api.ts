import ILogin from "../types/ILogin";
import IResponse from "../types/IResponse";
import IUser from "../types/IUser";
import IUserData from "../types/IUserData";
import INote from "../types/INote";
import INotes from "../types/INotes";

const baseURL = 'https://organizandotudo-api.onrender.com';

class Api {
    async CreateAccount(data: IUser) {
        try {
            let response = await fetch(`${baseURL}/CreateAccount`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                }
            );

            let result: IResponse = await response.json();
            return result;
        } catch (ex) {
            return { message: `${ex}`, code: "Error" };
        }
    }

    async Login(data: ILogin) {
        try {
            let response = await fetch(`${baseURL}/Login`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                }
            );

            let result: IUser = await response.json();
            return result;
        } catch (ex) {
            return { name: "", email: "", token: "" };
        }
    }

    async VerifyToken(data: IUser) {
        try {
            let response = await fetch(`${baseURL}/VerifyToken`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `${data.token}` }
                }
            );

            let result: IResponse = await response.json();
            return result;
        } catch (ex) {
            return { message: `${ex}`, code: "Error" };
        }
    }

    async GetUser(data: IUser) {
        try {
            let response = await fetch(`${baseURL}/GetUser`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `${data.token}` }
                }
            );

            let result: IResponse = await response.json();
            return result;
        } catch (ex) {
            return { name: "", email: "" };
        }
    }

    async UpdateUser(data: IUserData, token: string) {
        try {
            let response = await fetch(`${baseURL}/UpdateUser`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `${token}` },
                    body: JSON.stringify(data)
                }
            );

            let result: IResponse = await response.json();
            return result;
        } catch (ex) {
            return { message: `${ex}`, code: "Error" };
        }
    }

    async CreateNote(data: INote, token: string) {
        try {
            let response = await fetch(`${baseURL}/Note`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `${token}` },
                    body: JSON.stringify(data)
                }
            );

            let result: IResponse = await response.json();
            return result;
        } catch (ex) {
            return { message: `${ex}`, code: "Error" };
        }
    }

    async UpdateNote(data: INote, id: string, token: string) {
        try {
            let response = await fetch(`${baseURL}/Note/${id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `${token}` },
                    body: JSON.stringify(data)
                }
            );

            let result: IResponse = await response.json();
            return result;
        } catch (ex) {
            return { message: `${ex}`, code: "Error" };
        }
    }

    async DeleteNote(id: string, token: string) {
        try {
            let response = await fetch(`${baseURL}/Note/${id}`,
                {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `${token}` }
                }
            );

            let result: IResponse = await response.json();
            return result;
        } catch (ex) {
            return { message: `${ex}`, code: "Error" };
        }
    }

    async PublishNote(id: string, token: string) {
        try {
            let response = await fetch(`${baseURL}/PublishNote/${id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `${token}` }
                }
            );

            let result: IResponse = await response.json();
            return result;
        } catch (ex) {
            return { message: `${ex}`, code: "Error" };
        }
    }

    async GetNote(id: string, token: string): Promise<INote> {
        try {
            let response = await fetch(`${baseURL}/Note/${id}`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `${token}` }
                }
            );

            let result: INote = await response.json();
            return result;
        } catch (ex) {
            return { id: '', title: `${ex}`, content: "Error" };
        }
    }

    async GetNotes(token: string): Promise<INotes[]> {
        try {
            let response = await fetch(`${baseURL}/Notes`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `${token}` }
                }
            );

            let result: INotes[] = await response.json();
            return result;
        } catch (ex) {
            return [];
        }
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Api();