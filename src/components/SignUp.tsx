import {useContext, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {mockSignUp} from "../services/Auth.ts";
import loginSvg from "../assets/login.svg";
import lockSvg from "../assets/lock.svg";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../constants/routes.ts";
import {UserContext} from "../context/UserContext.tsx";
import {storeAccessToken} from "../utils/utils.ts";
import useModal from "../hooks/useModal.ts";

interface SignUpProps {
    setFlow: (flow: "SIGN_IN" | "SIGN_UP") => void;
}

export const SignUp = ({setFlow}: SignUpProps) => {

    const [name, setName] = useState('');
    const [handle, setHandle] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const {isOpen, closeModal} = useModal();

    const signUpMutation = useMutation({
        mutationFn: ({name, handle, email, password}: { name: string; handle: string; email: string; password: string }) => {
            return mockSignUp(name, handle, email, password)
        },
        onSuccess: (response) => {
            console.log('User created successfully!');
            setUser(response.data.user);
            if(response.data.accessToken)
                storeAccessToken(response.data.accessToken);
            // Navigate to feed page
            navigate(ROUTES.FEED);
            // if modal is open, close modal
            if(isOpen) closeModal();

        },
    })

    const validateSignUpForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!name.trim()) newErrors.name = 'Name is required';
        if (!handle.trim()) newErrors.handle = 'Handle is required';
        if (!email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (password !== repeatPassword) newErrors.repeatPassword = 'Passwords do not match';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateSignUpForm()) {
            signUpMutation.mutate({name, handle, email, password});
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">

            <div className="flex justify-center mb-6">
                <div className="relative">
                    <img src={loginSvg} className="h-8 w-8 text-blue-500" alt="User icon"/>
                    <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                        <img src={lockSvg} className="h-2 w-2 text-blue-600" alt="Lock icon"/>
                    </div>
                </div>
            </div>

            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`input-field ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your Name"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            <div>
                <label htmlFor="handle" className="block text-sm font-medium text-gray-700 mb-1">
                    Handle
                </label>
                <input
                    id="handle"
                    type="text"
                    required
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className={`input-field ${errors.handle ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your handle"
                />
                {errors.handle && <p className="mt-1 text-xs text-red-500">{errors.handle}</p>}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`input-field ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your email"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`input-field ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your password"
                />
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            <div>
                <label htmlFor="repeat-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Repeat Password
                </label>
                <input
                    id="repeat-password"
                    type="password"
                    required
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    className={`input-field ${errors.repeatPassword ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your password"
                />
                {errors.repeatPassword && <p className="mt-1 text-xs text-red-500">{errors.repeatPassword}</p>}
            </div>

            <div>
                <button
                    type="submit"
                    disabled={signUpMutation.isPending}
                    className="submit-button"
                    onClick={() => {
                        handleSubmit();
                    }}
                >
                    {signUpMutation.isPending ? 'Signing Up...' : 'Sign Up'}
                </button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <span className="font-medium text-blue-600 hover:text-blue-500" onClick={() => {
                    setFlow('SIGN_IN')
                }}>
                    Sign in
                </span>
            </p>
        </div>
    )
}
