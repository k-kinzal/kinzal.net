import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

/**
 * Root layout component for the application.
 *
 * @remarks
 * Provides:
 * - Navbar fixed to top of viewport
 * - Footer fixed to bottom of viewport
 * - Outlet for page content
 */
export function Layout() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <Outlet />
      <div className="fixed bottom-0 left-0 w-full z-50">
        <Footer />
      </div>
    </>
  );
}
