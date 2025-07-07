import {useEffect, useState} from "react";
import type {IPost} from "../types/types.ts";
import {mockFetchPosts} from "../services/Posts.ts";

export const useFetchPosts = () => {
    const [postList, setPostList] = useState<IPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await mockFetchPosts();
                if (response.success) {
                    setPostList(response.data);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return {
        postList,
        isLoading,
    }
}