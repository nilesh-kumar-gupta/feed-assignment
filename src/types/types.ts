export interface IUser {
    id: string;
    name: string;
    email: string;
    handle: string;
    avatar: string;
}

export interface IPost {
    id: string;
    content: string;
    author: IUser;
    createdAt: Date;
    mood: string; // Will contain emoji character
}