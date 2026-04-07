import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import HostOrJoin from "./HostOrJoin";
import Host from "./Host";
import Join from "./Join";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/hostorjoin" element={<HostOrJoin />} />
      <Route path="/host" element={<Host />} />
      <Route path="/join" element={<Join />} />
    </Routes>
  );
}

export default Router;