import { BrowserRouter, Route, Routes } from "react-router-dom";
import FoundItem from "./Page/Admin/FoundItem";
import LoginAdmin from "./Page/Admin/LoginAdmin";
import Navbar from "./Page/Admin/Navbar";
import AddItem from "./Page/Admin/AddItem";
import Dashboard from "./Page/Admin/Dashboard";
import CustomReport from "./Page/Admin/CustomReport";


// user
import HomePage from "./Page/User/HomePage";

function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/admin" element={<LoginAdmin />} />
          <Route path="/admin/FoundItem" element={<FoundItem />} />
          <Route path="/admin/navbar" element={<Navbar />} />
          <Route path="/admin/AddItem" element={<AddItem />} />
          <Route path="/admin/Dashboard" element={<Dashboard />} />
          <Route path="/admin/CustomReport" element={<CustomReport />} />
{/* user */}
          <Route path="/" element={<HomePage />} />


        </Routes>
    </BrowserRouter>

      </>
  );
}

export default App;