import React, { useContext } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext, { Context } from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { About } from "./pages/about";
import { Contact } from "./pages/contact";
import { UserPage } from "./pages/userPage";
import { SuperAdminPage } from "./pages/superAdminPage";
import { Adminpage } from "./pages/adminPage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";

//create your first component
const Layout = () => {
  const { store, actions } = useContext(Context);
  console.log(store.userLogged);

  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  function LayoutNavar() {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  }

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<LayoutNavar />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route element={<Contact />} path="/contact" />
              <Route element={<UserPage />} path="/userPage" />
              <Route element={<Adminpage />} path="/adminpage" />
              <Route element={<SuperAdminPage />} path="/superadminpage" />
              <Route element={<Demo />} path="/demo" />
              <Route element={<Single />} path="/single/:theid" />
            </Route>
            <Route element={<LoginPage />} path="/login" />
            <Route element={<SignupPage />} path="/signup" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
