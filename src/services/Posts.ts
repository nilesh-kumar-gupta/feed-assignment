import type {IPost, IUser} from "../types/types.ts";
import avatarIcon from '../../public/avatar.svg';

const postList: IPost[] = [
    {
        id: crypto.randomUUID(),
        content: '<p>This is the content of the first post. It contains some text. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
        createdAt: new Date('2025-07-06T10:00:00'),
        mood: '😊',
        author: {
            id: crypto.randomUUID(),
            name: 'John Doe',
            email: 'john@example.com',
            avatar: avatarIcon
        } as IUser
    },
    {
        id: crypto.randomUUID(),
        content: '<p>Another post with different content. This one is written by Jane. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
        createdAt: new Date('2025-07-07T09:30:00'),
        mood: '🎉',
        author: {
            id: crypto.randomUUID(),
            name: 'Jane Smith',
            email: 'jane@example.com',
            avatar: avatarIcon
        } as IUser
    },
    {
        id: crypto.randomUUID(),
        content: '<p>Here are the latest updates from our team. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
        createdAt: new Date('2025-07-07T11:15:00'),
        mood: '🚀',
        author: {
            id: crypto.randomUUID(),
            name: 'John Doe',
            email: 'john@example.com',
            avatar: avatarIcon
        } as IUser
    },
    {
        id: crypto.randomUUID(),
        content: 'Looking forward to a relaxing weekend! lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        createdAt: new Date('2025-07-07T12:45:00'),
        mood: '🌴',
        author: {
            id: crypto.randomUUID(),
            name: 'Mike Johnson',
            email: 'mike@example.com',
            avatar: avatarIcon
        } as IUser
    },
    {
        id: crypto.randomUUID(),
        content: 'We just reached a major milestone in our project! lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        createdAt: new Date('2025-07-07T14:20:00'),
        mood: '🎯',
        author: {
            id: crypto.randomUUID(),
            name: 'Jane Smith',
            email: 'jane@example.com',
            avatar: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff'
        } as IUser
    },
    {
        id: crypto.randomUUID(),
        content: 'Taking a much-needed coffee break after a long meeting. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        createdAt: new Date('2025-07-07T15:30:00'),
        mood: '☕',
        author: {
            id: crypto.randomUUID(),
            name: 'Sarah Wilson',
            email: 'sarah@example.com',
            avatar: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff'
        } as IUser
    },
    {
        id: crypto.randomUUID(),
        content: 'Deep in concentration working on a new feature. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        createdAt: new Date('2025-07-07T16:45:00'),
        mood: '💻',
        author: {
            id: crypto.randomUUID(),
            name: 'John Doe',
            email: 'john@example.com',
            avatar: avatarIcon
        } as IUser
    }
];

export interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export const mockFetchPosts = async (): Promise<ApiResponse<IPost[]>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                data: [...postList].reverse(),
            });
        }, 1000);
    });
};

export function createPost(content: string, selectedMood: string, author: IUser) {

    console.log('Creating post...');

    return new Promise((resolve) => {
        setTimeout(() => {
            const newPost: IPost = {
                id: crypto.randomUUID(),
                content: content,
                mood: selectedMood,
                createdAt: new Date,
                author: author
            }
            postList.push(newPost);
            resolve({
                success: true,
                data: newPost
            })
        }, 1000)
    });
}