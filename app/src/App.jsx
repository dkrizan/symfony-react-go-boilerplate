import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { history } from 'helpers';
import {Home, Profile, Web} from 'pages';
import {Login, Signup} from 'pages/Auth';
import {SecuredRoute, AuthLayout} from "./layout";
import {Request} from "./pages/Auth/PasswordReset/Request";
import {Reset} from "./pages/Auth/PasswordReset/Reset";
import AppSettingsContext from "./context/AppSettings";
import {useContext} from "react";
import {ProjectDashboard} from "./pages/Project/Dashboard";

export { App };

function App() {
  // init custom history object to allow navigation from
  // anywhere in the react app (inside or outside components)
  history.navigate = useNavigate();
  history.location = useLocation();

  const { darkMode }  = useContext(AppSettingsContext);

  return (
      <div className={`app-container flex flex-col h-full w-full ${darkMode && "dark"}`}>
          <Routes>
            <Route element={<SecuredRoute />}>
                <Route path="/" element={<Home />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/project/:id" element={<ProjectDashboard />}/>
            </Route>
            <Route path="/web" element={<Web />} />
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/reset-password" element={<Request />} />
                <Route path="/reset-password/:token" element={<Reset />} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Link to="/" />} />
          </Routes>
      </div>
  );
}