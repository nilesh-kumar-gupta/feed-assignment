import type {IPost} from '../types/types';
import {getTimeElapsed} from '../utils/utils.ts';
import useModal from "../hooks/useModal.ts";
import likeIcon from "../assets/like.svg";
import commentIcon from "../assets/comment.svg";
import shareIcon from "../assets/share.svg";

interface PostProps {
    post: IPost;
}

export const Post = ({post}: PostProps) => {

    const {openModal} = useModal();

    return (
        <article className="bounding-container flex flex-col gap-2">
            <div className="flex bg-white rounded-3xl flex-10/12 gap-6 p-4" id={"post-content"}>
                <div className="flex flex-col items-center gap-3">
                    <img
                        src={post.author.avatar}
                        alt={`${post.author.name}'s avatar`}
                        className="w-12 h-12 object-cover"
                    />
                    <div className="rounded-full bg-gray-100 w-9 h-9 flex items-center justify-center">
                        <div className="text-xl">{post.mood}</div>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="mb-3">
                        <h3 className="font-medium text-gray-900 text-base">{post.author.name}</h3>
                        <p className="text-sm text-gray-500">{getTimeElapsed(post.createdAt)}</p>
                    </div>


                    <div className="mb-4">
                        <div
                            className="text-gray-800 text-base leading-relaxed ql-editor"
                            dangerouslySetInnerHTML={{__html: post.content}}
                        />
                    </div>

                </div>
            </div>
            <div className="border-t border-gray-200">
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-200 rounded-full transition-colors" onClick={() => {
                        openModal("Function not implemented")
                    }}>
                        <img src={likeIcon} alt="Like" className="w-5 h-5"/>
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded-full transition-colors" onClick={() => {
                        openModal("Function not implemented")
                    }}>

                        <img src={commentIcon} alt="Comment" className="w-5 h-5"/>
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded-full transition-colors" onClick={() => {
                        openModal("Function not implemented")
                    }}>

                        <img src={shareIcon} alt="Share" className="w-5 h-5"/>
                    </button>
                </div>
            </div>
        </article>
    );
};
