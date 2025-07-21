import { Route } from "react-router-dom";
import Home from "../pages/user/Home";
import Login from "../pages/user/LoginPage";

export const commonRoutes = (
    <>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Home />} />
    </>
    
);