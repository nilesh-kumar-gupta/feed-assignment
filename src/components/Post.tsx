import type { IPost } from '../types/types';
import { getFormattedDate } from '../utils/utils.ts';

interface PostProps {
  post: IPost;
}

export const Post = ({ post }: PostProps) => {
  return (
    <article className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex gap-6">
        {/* Left Column - Avatar and Mood */}
        <div className="flex flex-col items-center gap-3">
          <img
            src={post.author.avatar}
            alt={`${post.author.name}'s avatar`}
            className="w-14 h-14 rounded-full object-cover"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(post.author.name);
            }}
          />
          <span className="text-4xl">{post.mood}</span>
        </div>

        {/* Right Column - Content */}
        <div className="flex-1">
          {/* Author Info */}
          <div className="mb-3">
            <h3 className="font-medium text-gray-900 text-base">{post.author.name}</h3>
            <p className="text-sm text-gray-500">@{post.author.handle}</p>
          </div>

          {/* Post Content */}
          <div className="mb-4">
            <p className="text-gray-800 text-base leading-relaxed">{post.content}</p>
          </div>

          {/* Footer - Time and Actions */}
          <div className="flex items-center justify-between">
            <time className="text-sm text-gray-500" dateTime={post.createdAt.toISOString()}>
              {getFormattedDate(post.createdAt)}
            </time>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <img src="/src/assets/like.svg" alt="Like" className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <img src="/src/assets/comment.svg" alt="Comment" className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <img src="/src/assets/share.svg" alt="Share" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};