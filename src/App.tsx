import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Feed from "./components/Feed.tsx";
import UserAuth from "./components/UserAuth.tsx";
import { ROUTES } from './constants/routes';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


const queryClient = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/" element={<Feed/>}/>
                    <Route path={ROUTES.FEED} element={<Feed/>}/>
                    <Route path={ROUTES.AUTH} element={<UserAuth flowType={"SIGN_IN"}/>}/>
                    <Route path="*" element={<Feed/>}/>
                </Routes>
            </Router>
        </QueryClientProvider>
    )
}

export default App