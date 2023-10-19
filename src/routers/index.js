import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AdminRouters from "./adminRouter";

import DefaultLayout from "../components/DefaultLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
// import Register from "../pages/Register";
import LayoutNavSearchFooter from "../components/LayoutNavSearchFooter";
import Recipe from "../pages/Recipe";
import Plan from "../pages/Plan";
import RecipeDetail from "../pages/Detail/RecipeDetail";
import PremiumPack from "../pages/PremiumPack";
import Expert from "../pages/Expert";
import LayoutWithoutSearch from "../components/LayoutWithoutSearch";
import PlanDetail from "../pages/Detail/PlanDetail";
import Profile from "../pages/Profile";
import Admin from "../pages/Admin";
import AdminLogin from "../pages/Admin/login";
import ListExpert from "../pages/ListExpert";
import PrivateRouters from "./PrivateRouter";
import LayoutWithoutAds from "../components/LayoutWithoutAds";
import UserRouters from "./UserRouter";

export const publicRouters = [
  {
    path: "/",
    name: "home",
    component: Home,
    layout: LayoutNavSearchFooter,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  // {
  //   path: "/register",
  //   name: "register",
  //   component: Register,
  // },
  {
    path: "/recipe",
    name: "recipe",
    component: Recipe,
    layout: LayoutWithoutSearch,
  },
  {
    path: "/plan",
    name: "plan",
    component: Plan,
    layout: LayoutWithoutSearch,
  },
  {
    path: "/recipe-detail/:id",
    name: "recipe-detail",
    component: RecipeDetail,
    layout: LayoutWithoutAds,
  },
  {
    path: "/pack",
    name: "pack",
    component: PremiumPack,
    layout: LayoutWithoutSearch,
  },
  {
    path: "/expert",
    name: "expert",
    component: Expert,
    layout: LayoutWithoutAds,
  },
  {
    path: "/plan-detail",
    name: "plan-detail",
    component: PlanDetail,
    layout: LayoutWithoutSearch,
  },
  {
    path: "/admin/dashboard",
    name: "dashboard",
    component: Admin,
  },
  {
    path: "/blw-manager/login",
    name: "adminlogin",
    component: AdminLogin,
  },
  {
    path: "/list-expert",
    name: "list-expert",
    component: ListExpert,
    layout: LayoutWithoutAds,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: ListExpert,
    layout: LayoutWithoutSearch,
  },
];

export const privateRouters = [
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    layout: LayoutWithoutAds,
  },
];

export const userRouters = [];

//Scroll Top when clicked another page
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

export const adminRouters = [
  {
    path: "/user-list",
    name: "user-list",
    component: Admin,
    layout: LayoutWithoutSearch,
  },
];

export const RouterComponents = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <ScrollToTop />
        <Routes>
          {publicRouters.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          <Route exact path="/" element={<PrivateRouters />}>
            {privateRouters.map((route, index) => {
              const Page = route.component;
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Route>
          <Route exact path="/" element={<AdminRouters />}>
            {adminRouters.map((route, index) => {
              const Page = route.component;
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Route>
          {/* <Route exact path="/" element={<UserRouters />}>
            {userRouters.map((route, index) => {
              const Page = route.component;
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Route> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};
