import type {IUser} from '../types/types';

interface AuthResponse {
    success: boolean;
    data: {
        user: IUser | null;
        accessToken: string | null;
    };
}

export const mockSignIn = async (email: string, password: string): Promise<AuthResponse> => {
    // Simulate API call delay
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'test@example.com' && password === 'password') {
                const user: IUser = {
                    id: '1',
                    name: 'Test User',
                    email: 'test@example.com',
                    handle: '@testuser',
                    avatar: 'https://via.placeholder.com/150'
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
    // Simulate API call delay
    return await new Promise(resolve => setTimeout(() => {
        const user: IUser = {
            id: Math.random().toString(36).substring(2),
            name,
            email,
            handle,
            avatar: `https://via.placeholder.com/150?text=${encodeURIComponent(name.charAt(0))}`
        };

        const accessToken = 'mock-jwt-token';

        // // Set HTTP-only cookie
        // document.cookie = `accessToken=${accessToken}; path=/; max-age=86400; secure; samesite=strict; httponly`;

        resolve({success: true, data: {user, accessToken}});
    }, 500));
};

