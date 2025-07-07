import {useContext, useState} from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {QUERY_KEYS} from "../constants/queryKeys.ts";
import {createPost} from "../services/Posts.ts";
import {UserContext} from "../context/UserContext.tsx";
import useModal from "../hooks/useModal.ts";
import UserAuth from "./UserAuth.tsx";

const CreatePost = () => {
    const [content, setContent] = useState('');
    const [selectedMood, setSelectedMood] = useState('😊');
    const { user, isAuthenticated } = useContext(UserContext);
    const { openModal } = useModal();

    const queryClient = useQueryClient();
    const submitMutation = useMutation({
        mutationFn: ({content, selectedMood}: {
            content: string,
            selectedMood: string
        }) => {
            if(!user) throw new Error('User not authenticated');
            return createPost(content, selectedMood, user);
        },
        onSuccess: () => {
            console.log('Post created successfully!');
            queryClient.invalidateQueries({queryKey: [QUERY_KEYS.POST_LIST]})
            setContent('');
        },
        onError: (error) => {
            console.error('Error creating post:', error);
        }
    });

    // Custom toolbar options
    const modules = {
        toolbar: {
            container: [
                ['bold', 'italic', 'underline'],
                [{size: ['small', false, 'large', 'huge']}],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                ['blockquote', 'code-block'],
                ['clean']
            ],
        }
    };

    // Replace the clean button with a custom trash icon
    const moods = ['😊', '🎉', '🚀', '🌴', '🎯', '☕', '💻'];

    const handleSubmit = () => {
        if (!isAuthenticated){
            openModal(<UserAuth flowType={"SIGN_IN"} />)
            return;
        }
        if (!content.trim()) return;
        submitMutation.mutate({content, selectedMood});
    };

    return (
        <div className="bounding-container space-y-2">

            <div className="bg-white border border-white rounded-3xl">

                <div className="text-lg p-2">Create Post</div>

                <div className="quill-container">
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        modules={modules}
                        placeholder="What's on your mind?"
                    />
                </div>
            </div>

            <div className="flex justify-between items-center border-t border-gray-100">
                <div className="flex items-center gap-2">
                    {moods.map((mood) => (
                        <button
                            key={mood}
                            className={`p-2 rounded-full transition-colors ${selectedMood === mood ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                            onClick={() => setSelectedMood(mood)}
                        >
                            <span role="img" aria-label="emoji" className="text-xl">{mood}</span>
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white mr-2 px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium"
                >
                    Post
                </button>
            </div>
        </div>
    );
};

export default CreatePost;