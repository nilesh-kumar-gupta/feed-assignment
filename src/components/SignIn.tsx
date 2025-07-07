import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {mockSignIn} from "../services/Auth.ts";
import {ROUTES} from "../constants/routes.ts";
import loginSvg from "../assets/login.svg";
import lockSvg from "../assets/lock.svg";
import {UserContext} from "../context/UserContext.tsx";
import {storeAccessToken} from "../utils/utils.ts";
import useModal from "../hooks/useModal.ts";

interface SignInProps {
    setFlow: (flow: "SIGN_IN" | "SIGN_UP") => void;
}

export const SignIn = ({setFlow}: SignInProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const {isOpen, closeModal} = useModal()

    const signInMutation = useMutation({
        mutationFn: ({email, password}: { email: string; password: string }) =>
            mockSignIn(email, password),
        onSuccess: (response) => {
            // Store user data in context
            setUser(response.data.user);
            if(response.data.accessToken)
                storeAccessToken(response.data.accessToken);

            // Navigate to feed
            navigate(ROUTES.FEED);
            // if modal is open, close modal
            if(isOpen) closeModal();

        },
        onError: () => {
            setEmail('');
            setPassword('');
            setErrors({invalidCredentials: 'Invalid email or password'});
        }
    });

    const validateSignInForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!email.trim()) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = () => {
        if(validateSignInForm())
            signInMutation.mutate({email, password});
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-center mb-6">
                <div className="relative">
                    <img src={loginSvg} className="h-8 w-8 text-blue-500" alt="User icon"/>
                    <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                        <img src={lockSvg} className="h-2 w-2 text-blue-600" alt="Lock icon"/>
                    </div>
                </div>
            </div>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign In</h2>

            <div className="space-y-6">
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
                    {errors.invalidCredentials &&
                        <p className="text-sm text-red-500">{errors.invalidCredentials}</p>}

                </div>

                <div>
                    <button
                        disabled={signInMutation.isPending}
                        onClick={handleSubmit}
                        className="submit-button"
                    >
                        {signInMutation.isPending ? 'Signing in...' : 'Sign In'}
                    </button>
                </div>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <span className="font-medium text-blue-600 hover:text-blue-500" onClick={() => setFlow('SIGN_UP')}>
                    Sign up
                </span>
            </p>
        </div>
    );
}
