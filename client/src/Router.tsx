import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import HostOrJoin from "./HostOrJoin";
import Host from "./Host";
import Join from "./Join";
import InfoPage from "./InfoPage";
import Dashboard from "./Dashboard";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/hostorjoin" element={<HostOrJoin />} />
      <Route path="/host" element={<Host />} />
      <Route path="/join" element={<Join />} />
      <Route path="/info" element={<InfoPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default Router;