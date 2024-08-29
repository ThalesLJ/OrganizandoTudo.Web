import ILogin from "../types/ILogin";
import IResponse from "../types/IResponse";
import IUser from "../types/IUser";
import IUserData from "../types/IUserData";
import INote from "../types/INote";
import INotes from "../types/INotes";

const baseURL = 'https://data.mongodb-api.com/app/application-0-mqvuy/endpoint';

class Api {
    async CreateAccount(data: IUserData): Promise<IResponse> {
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
            return { pt: { message: `${ex}`, code: "Error" }, en: { message: `${ex}`, code: "Error" } };
        }
    }

    async Login(data: ILogin): Promise<IUser> {
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
            return { token: "", username: "", email: "" };
        }
    }

    async VerifyToken(data: IUser): Promise<IResponse> {
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
            return { pt: { message: `${ex}`, code: "Error" }, en: { message: `${ex}`, code: "Error" } };
        }
    }

    async GetUser(data: IUser): Promise<IUserData> {
        try {
            let response = await fetch(`${baseURL}/User`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `${data.token}` }
                }
            );

            let result: IUserData = await response.json();
            return result;
        } catch (ex) {
            return { username: '', email: '', password: '' };
        }
    }

    async UpdateUser(data: IUserData, token: string): Promise<IResponse> {
        try {
            let response = await fetch(`${baseURL}/User`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `${token}` },
                    body: JSON.stringify({ data: data })
                }
            );

            let result: IResponse = await response.json();
            return result;
        } catch (ex) {
            return { pt: { message: `${ex}`, code: "Error" }, en: { message: `${ex}`, code: "Error" } };
        }
    }

    async CreateNote(data: INote, token: string): Promise<IResponse> {
        try {
            let response = await fetch(`${baseURL}/Note`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `${token}` },
                    body: JSON.stringify({ note: data })
                }
            );

            let result: IResponse = await response.json();
            return result;
        } catch (ex) {
            return { pt: { message: `${ex}`, code: "Error" }, en: { message: `${ex}`, code: "Error" } };
        }
    }

    async UpdateNote(data: INote, id: string, token: string): Promise<IResponse> {
        try {
            let response = await fetch(`${baseURL}/Note?id=${id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `${token}` },
                    body: JSON.stringify({ newNote: data })
                }
            );

            let result: IResponse = await response.json();
            return result;
        } catch (ex) {
            return { pt: { message: `${ex}`, code: "Error" }, en: { message: `${ex}`, code: "Error" } };
        }
    }

    async DeleteNote(id: string, token: string): Promise<IResponse> {
        try {
            let response = await fetch(`${baseURL}/Note?id=${id}`,
                {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `${token}` }
                }
            );

            let result: IResponse = await response.json();
            return result;
        } catch (ex) {
            return { pt: { message: `${ex}`, code: "Error" }, en: { message: `${ex}`, code: "Error" } };
        }
    }

    async PublishNote(id: string, token: string): Promise<IResponse> {
        try {
            let response = await fetch(`${baseURL}/PublishNote?id=${id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `${token}` }
                }
            );

            let result: IResponse = await response.json();
            return result;
        } catch (ex) {
            return { pt: { message: `${ex}`, code: "Error" }, en: { message: `${ex}`, code: "Error" } };
        }
    }

    async GetNote(id: string, token: string): Promise<INote> {
        try {
            let response = await fetch(`${baseURL}/Note?id=${id}`,
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

    async GetPublicNote(id: string): Promise<INote> {
        try {
            let response = await fetch(`${baseURL}/Note?id=${id}`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
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