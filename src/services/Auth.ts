import type {IUser} from '../types/types';
import avatarIcon from '../../public/avatar.svg';

interface AuthResponse {
    success: boolean;
    data: {
        user: IUser | null;
        accessToken: string | null;
    };
}

const loginCredential = [
    {email: "demo@example.com", password: "password123"},
    {email: "test@user.com", password: "testpass"}
]

export const mockSignIn = async (email: string, password: string): Promise<AuthResponse> => {

    // get storage token and add it onto the request

    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            if (loginCredential.some((cred) => cred.email === email && cred.password === password)) {
                const user: IUser = {
                    id: '1',
                    name: 'Test User',
                    email: email,
                    handle: '@testuser',
                    avatar: `${avatarIcon}`
                };

                const accessToken = 'mock-jwt-token';

                resolve({success: true, data: {user, accessToken}});
            } else {
                reject({message: 'Invalid email or password'});
            }
        }, 500)
    });
};

export const mockSignUp = async (
    name: string,
    email: string,
    _password: string,
    handle: string
): Promise<AuthResponse> => {
    return await new Promise(resolve => setTimeout(() => {
        const user: IUser = {
            id: crypto.randomUUID(),
            name,
            email,
            handle,
            avatar: `${avatarIcon}`
        };

        const accessToken = 'mock-jwt-token';

        resolve({success: true, data: {user, accessToken}});
    }, 500));
};

