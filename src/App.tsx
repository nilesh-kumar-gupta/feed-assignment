import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Feed from "./components/Feed.tsx";
import UserAuth from "./components/UserAuth.tsx";
import { ROUTES } from './constants/routes';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { UserProvider } from "./context/UserContext";
import {ModalProvider} from "./context/ModalContext.tsx";
import Modal from "./components/Modal.tsx";


const queryClient = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <ModalProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Feed/>}/>
                            <Route path={ROUTES.FEED} element={<Feed/>}/>
                            <Route path={ROUTES.AUTH} element={<UserAuth flowType={"SIGN_IN"}/>}/>
                            <Route path="*" element={<Feed/>}/>
                        </Routes>
                        <Modal />
                    </Router>
                </ModalProvider>
            </UserProvider>
        </QueryClientProvider>
    )
}

export default App
