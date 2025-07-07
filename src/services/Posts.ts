import type {IPost, IUser} from "../types/types.ts";

const postList: IPost[] = [
    {
        id: '1',
        content: 'This is the content of the first post. It contains some text. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        createdAt: new Date('2025-07-06T10:00:00'),
        mood: '😊',
        author: {
            id: 'user1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'src/assets/avatar.svg'
        } as IUser
    },
    {
        id: '2',
        content: 'Another post with different content. This one is written by Jane. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        createdAt: new Date('2025-07-07T09:30:00'),
        mood: '🎉',
        author: {
            id: 'user2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            avatar: 'src/assets/avatar.svg'
        } as IUser
    },
    {
        id: '3',
        content: 'Here are the latest updates from our team. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        createdAt: new Date('2025-07-07T11:15:00'),
        mood: '🚀',
        author: {
            id: 'user1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'src/assets/avatar.svg'
        } as IUser
    },
    {
        id: '4',
        content: 'Looking forward to a relaxing weekend! lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        createdAt: new Date('2025-07-07T12:45:00'),
        mood: '🌴',
        author: {
            id: 'user3',
            name: 'Mike Johnson',
            email: 'mike@example.com',
            avatar: 'src/assets/avatar.svg'
        } as IUser
    },
    {
        id: '5',
        content: 'We just reached a major milestone in our project! lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        createdAt: new Date('2025-07-07T14:20:00'),
        mood: '🎯',
        author: {
            id: 'user2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            avatar: 'src/assets/avatar.svg'
        } as IUser
    },
    {
        id: '6',
        content: 'Taking a much-needed coffee break after a long meeting. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        createdAt: new Date('2025-07-07T15:30:00'),
        mood: '☕',
        author: {
            id: 'user4',
            name: 'Sarah Wilson',
            email: 'sarah@example.com',
            avatar: 'src/assets/avatar.svg'
        } as IUser
    },
    {
        id: '7',
        content: 'Deep in concentration working on a new feature. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        createdAt: new Date('2025-07-07T16:45:00'),
        mood: '💻',
        author: {
            id: 'user1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'src/assets/avatar.svg'
        } as IUser
    }
];

export interface ApiResponse {
    success: boolean;
    data: IPost[];
}

export const mockFetchPosts = async (): Promise<ApiResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                data: postList
            });
        }, 1000);
    });
};