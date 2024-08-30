import React from "react";
import { NavLink } from "react-router-dom";
import { LocalMall } from "@mui/icons-material";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const handlelogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("logout Successfully");
  };
  return (
    <div className="shadow-2xl grid lg:grid-cols-4 grid-cols-2 py-3 bg-slate-600">
      <div className="col-span-2">
        <h2 className="ms-4 text-lg font-bold">Pooja E-commerce</h2>
      </div>
      <div className="list-none flex space-x-3 lg:justify-end justify-start lg:pe-3 ps-3 col-span-2 border border-yellow-900">
        <li>
          {" "}
          <NavLink to="/">HOME</NavLink>
        </li>
        <li>
          {" "}
          <NavLink to="/category">CETEGORY</NavLink>
        </li>
        {!auth.user ? (
          <>
            <li>
              {" "}
              <NavLink to="/register">REGISTER</NavLink>
            </li>
            <li>
              {" "}
              <NavLink to="/login">LOGIN</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              {" "}
              <NavLink onClick={handlelogout} to="/login">
                LOGOUT
              </NavLink>
            </li>
          </>
        )}
        <li>
          {" "}
          <LocalMall /> (0)
        </li>
        {/* </ul> */}
      </div>
    </div>
  );
};

export default Header;
