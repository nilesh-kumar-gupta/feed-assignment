import type {IUser} from '../types/types';

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
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            if (loginCredential.includes({email, password})) {
                const user: IUser = {
                    id: '1',
                    name: 'Test User',
                    email: email,
                    handle: '@testuser',
                    avatar: `../assets/avatar.svg`
                };

                const accessToken = 'mock-jwt-token';

                // // Set HTTP-only cookie
                // document.cookie = `accessToken=${accessToken}; path=/; max-age=86400; secure; samesite=strict; httponly`;

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
            avatar: `../assets/avatar.svg`
        };

        const accessToken = 'mock-jwt-token';

        // // Set HTTP-only cookie
        // document.cookie = `accessToken=${accessToken}; path=/; max-age=86400; secure; samesite=strict; httponly`;

        resolve({success: true, data: {user, accessToken}});
    }, 500));
};

