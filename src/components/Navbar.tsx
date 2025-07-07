import {useContext} from "react";
import {UserContext} from "../context/UserContext.tsx";
import {Link} from "react-router-dom";
import {ROUTES} from "../constants/routes.ts";

const Navbar = () => {

    const {isAuthenticated} = useContext(UserContext)

    console.log(isAuthenticated);

    return (
        <div className="border-b border-gray-200 h-8 flex items-center justify-between p-6">
            <div>
                Forum
            </div>

            <div>
                {!isAuthenticated &&
                    <Link to={ROUTES.AUTH} className="text-lg cursor-pointer">
                        <span className="text-lg">Sign In</span>
                    </Link>
                }
            </div>
        </div>
    )
}

export default Navbar;