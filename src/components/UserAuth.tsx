import {useState} from 'react';
import {SignIn} from "./SignIn.tsx";
import {SignUp} from "./SignUp.tsx";

interface UserAuthProps {
    flowType: "SIGN_IN" | "SIGN_UP";
}

const UserAuth = ({flowType}: UserAuthProps) => {

    const [flow, setFlow] = useState(flowType);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-12">
            <div className="w-full max-w-md">
                {flow === "SIGN_IN" ? <SignIn setFlow={setFlow} /> : <SignUp setFlow={setFlow}/>}
            </div>
        </div>
    );
}



export default UserAuth;
