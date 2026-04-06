//handles pages
import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import HostOrJoin from "./HostOrJoin";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/hostorjoin" element={<HostOrJoin />} />
        </Routes>
    );
}

export default Router;