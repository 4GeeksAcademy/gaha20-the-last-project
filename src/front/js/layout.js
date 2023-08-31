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
import { ProtectedRoute } from "./util/ProtectedRoute";
import AccessDeniedPage from "./pages/accessDeniedPage";

const Layout = () => {
  const { store, actions } = useContext(Context);
  const { userLogged } = store;

  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  function LayoutNavar() {
    return (
      <div style={{ minHeight: "93vh" }}>
        <Navbar />
        <Outlet />
      </div>
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
              <Route
                path="/adminpage"
                element={
                  <ProtectedRoute
                    redirectTo="/accessdeniedpage"
                    isAllowed={
                      !!userLogged &&
                      (userLogged?.user_type === "admin" ||
                        userLogged?.user_type === "superadmin")
                    }
                  >
                    <Adminpage />
                  </ProtectedRoute>
                }
              />
              <Route element={<SuperAdminPage />} path="/superadminpage" />
              <Route element={<AccessDeniedPage />} path="/accessdeniedpage" />

              <Route element={<Demo />} path="/demo" />
              <Route element={<Single />} path="/single/:theid" />
            </Route>
            <Route element={<ProtectedRoute isAllowed={!!!userLogged} />}>
              <Route element={<LoginPage />} path="/login" />
              <Route element={<SignupPage />} path="/signup" />
            </Route>
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
