import { makeAutoObservable } from "mobx";
import IUser from "../types/IUser";
import Api from "../services/Api";

class Auth {
    user: IUser = { username: "", email: "", token: "" };
    isTokenValid: boolean = false;

    constructor() {
        makeAutoObservable(this);
        this.hydrate();
    }

    checkTokenValidity() {
        this.hydrate();
        this.isTokenValid = false;

        if (this.user !== null && this.user.token !== null && this.user.token !== '') {
            const response = Api.VerifyToken(this.user);
            if (response.en.code === "Success") {
                this.isTokenValid = true;
            }
        }
    }

    login({ username, email, token }: IUser) {
        this.user = { username, email, token };
        this.persistUser();
    }

    logout() {
        this.user = { username: "", email: "", token: "" };
        this.unpersistUser();
    }

    private persistUser() {
        this.setCookie('user', JSON.stringify(this.user), 5000);
        this.isTokenValid = true;
    }

    private unpersistUser() {
        this.removeCookie('user');
        this.isTokenValid = false;
    }

    private hydrate() {
        this.user = JSON.parse(this.getCookie('user') || 'null');
    }

    private setCookie(name: string, value: string, days: number) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = 'expires=' + date.toUTCString();
        document.cookie = name + '=' + value + ';' + expires + ';path=/';
    }

    private getCookie(name: string) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    private removeCookie(name: string) {
        this.setCookie(name, '', -1);
    }
}

const authInstance = new Auth();
authInstance.checkTokenValidity();
export default authInstance;