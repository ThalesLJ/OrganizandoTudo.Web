import { useState } from "react";

const baseURL = 'https://data.mongodb-api.com/app/application-0-mqvuy/endpoint';

export default function useSimpleGet() {
    const [sucess, setSucess] = useState(false);
    const [error, setError] = useState('');

    async function send<T>({ url, data }: { url: string, data: T }) {
        try {
            await fetch(`${baseURL}/${url}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            );
            setSucess(true);
        } catch (ex) {
            setError(`${ex}`);
        }
    };

    return {send, sucess, error}
}
