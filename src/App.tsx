import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Feed from "./components/Feed.tsx";
import UserAuth from "./components/UserAuth.tsx";
import { ROUTES } from './constants/routes';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Feed/>}/>
            <Route path={ROUTES.FEED} element={<Feed/>}/>
            <Route path={ROUTES.AUTH} element={<UserAuth />} />
            <Route path="*" element={<Feed/>}/>
        </Routes>
    </Router>
  )
}

export default App