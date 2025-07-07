import {Post} from "./Post.tsx";
import CreatePost from "./CreatePost.tsx";
import {useQuery} from "@tanstack/react-query";
import type {IPost} from "../types/types.ts";
import {type ApiResponse, mockFetchPosts} from "../services/Posts.ts";
import {QUERY_KEYS} from "../constants/queryKeys.ts";


const Feed = () => {
    const {data: postList = [], isLoading: isPostListLoading} = useQuery<ApiResponse<IPost[]>, Error, IPost[]>({
        queryKey: [QUERY_KEYS.POST_LIST],
        queryFn: mockFetchPosts,
        select: (response) => response.data
    });

    return (
        <div className="max-w-1/2 mx-auto mt-6 space-y-8">
            <div>
                <CreatePost/>
            </div>

            {isPostListLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="space-y-6">
                    {postList.map((post) => (
                        <Post key={post.id} post={post}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Feed;