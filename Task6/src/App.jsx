
import { lazy } from "react";
import { Routes, Route } from "react-router";

import RootLayout from "./layouts/RootLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";

const About = lazy(() => import("./pages/About"));

const Products = lazy(
  () => import("./pages/Products")
);

const ProductDetails = lazy(
  () => import("./pages/ProductDetails")
);

const Dashboard = lazy(
  () => import("./pages/Dashboard")
);

const Login = lazy(
  () => import("./pages/Login")
);

const Signup = lazy(
  () => import("./pages/Signup")
);

const Profile = lazy(
  () => import("./pages/Profile")
);

const NotFound = lazy(
  () => import("./pages/NotFound")
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />

        <Route path="about" element={<About />} />

        <Route path="products">
          <Route index element={<Products />} />

          <Route
            path=":id"
            element={<ProductDetails />}
          />
        </Route>

        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        <Route path="login" element={<Login />} />

        <Route path="signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="profile"
            element={<Profile />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
