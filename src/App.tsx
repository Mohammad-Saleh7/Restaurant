import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import { Box, CircularProgress } from "@mui/material";

import Footer from "./components/Footer";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/HomePage"));
const MenuPage = lazy(() => import("./pages/MenuPage"));
const MenuItemPage = lazy(() => import("./pages/MenuItemPage"));

const Appetizers = lazy(() => import("./pages/categories/Appetizers"));
const Salads = lazy(() => import("./pages/categories/Salads"));
const MainCourses = lazy(() => import("./pages/categories/MainCourses"));
const Drinks = lazy(() => import("./pages/categories/Drinks"));

const Cart = lazy(() => import("./pages/Cart"));

const Auth = lazy(() => import("./pages/Auth"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/SignUp"));

function PageLoader() {
  return (
    <Box
      role="status"
      aria-label="Loading page"
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

function AppLayout() {
  const location = useLocation();

  const hideFooter =
    location.pathname.startsWith("/auth/login") ||
    location.pathname.startsWith("/auth/signup") ||
    location.pathname === "/auth";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/menu/:id" element={<MenuItemPage />} />

            <Route path="/appetizers" element={<Appetizers />} />
            <Route path="/salads" element={<Salads />} />
            <Route path="/maincourses" element={<MainCourses />} />
            <Route path="/drinks" element={<Drinks />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/auth" element={<Auth />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          </Routes>
        </Suspense>
      </Box>

      {!hideFooter && <Footer />}
    </Box>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
