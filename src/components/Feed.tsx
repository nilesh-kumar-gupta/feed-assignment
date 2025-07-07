import {Post} from "./Post.tsx";
import {useFetchPosts} from "../hooks/useFetchPosts.ts";
import CreatePost from "./CreatePost.tsx";


const Feed = () => {

  const {postList, isLoading: isPostListLoading}= useFetchPosts()

  return (
      <div className="max-w-1/2 mx-auto mt-6 space-y-8">
        <div>
          <CreatePost />
        </div>

        {isPostListLoading ? (
            <div>Loading...</div>
        ) : (
            <div className="space-y-6">
              {postList.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
        )}
      </div>
  );
};

export default Feed;