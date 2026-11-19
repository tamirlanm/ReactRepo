
import { Suspense } from "react";
import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import PwaStatus from "../components/PwaStatus";

function RootLayout() {
  return (
    <div className="site">
      <NavBar />
      <PwaStatus />
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
