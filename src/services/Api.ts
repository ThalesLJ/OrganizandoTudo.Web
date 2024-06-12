import ILogin from "../types/ILogin";
import IUser from "../types/IUser";

const baseURL = 'https://data.mongodb-api.com/app/application-0-mqvuy/endpoint';

class Api {
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
            return { Apelido: "", Email: "", Token: "" };
        }
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Api();