import { User } from "../models/User";

import { API_BASE_URL } from "../vite-env.d";

const API_URL = API_BASE_URL+'/auth/accounts';

interface SignUpData {
    username: string;
    email: string;
    password: string;
    fullname: string;
    age: number;
    countryId: number;
}

interface SignUpResponse {
    message?: string;
    user: User;
}


async function signUp(data: SignUpData): Promise<SignUpResponse> {
    const response = await fetch(API_URL+'/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const responseData = await response.json();
    if (response.ok){
        return responseData;
    }
    throw new Error(responseData.message);
}

export { signUp };