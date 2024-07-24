import { makeAutoObservable } from "mobx";
import IUser from "../types/IUser";

class Auth {
    user: IUser = { name: "", email: "", token: "" };

    constructor() {
        makeAutoObservable(this);
        this.hydrate();
    }

    isTokenValid() {
        this.hydrate();

        if (this.user === null) {
            return false;
        }
        if (this.user.token === null || this.user.token === '') {
            return false;
        }

        return true;
    }

    login({ name, email, token }: IUser) {
        this.user = { name, email, token };
        this.persistUser();
    }

    logout() {
        this.user = { name: "", email: "", token: "" };
        this.unpersistUser();
    }

    persistUser() {
        this.setCookie('user', JSON.stringify(this.user), 1);
    }

    unpersistUser() {
        this.removeCookie('user');
    }

    hydrate() {
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

    removeCookie(name: string) {
        this.setCookie(name, '', -1); // Define o tempo de expiração como -1 para remover o cookie
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Auth();