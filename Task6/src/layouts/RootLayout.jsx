
import { Suspense } from "react";
import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

function RootLayout() {
  return (
    <div className="site">
      <NavBar />

      <main className="container main-content">
        <Suspense
          fallback={
            <output className="status-message">
                Loading page...
            </output>
          }
        >
          <Outlet />
        </Suspense>
      </main>

      <footer className="site-footer">
        <div className="container">
          ProductExplorer © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}

export default RootLayout;
