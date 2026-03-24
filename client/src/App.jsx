import { useLocation } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes"
import { Toaster } from 'react-hot-toast';
import Navbar from "./components/layout/Navbar";
import ScrollToTop from "./components/ui/ScrollToTop";
import { isDashboardPath } from "./utils/dashboardRoutes";

const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isDashboardPage = isDashboardPath(location.pathname);
  const shouldShowNavbar = !isAuthPage && !isDashboardPage;

  return (
    <div className="min-h-screen bg-white font-sans text-text-primary">
      <Toaster position="top-right" />
      {shouldShowNavbar ? <Navbar /> : null}
      <ScrollToTop />
      <main className={shouldShowNavbar ? "pt-20" : ""}>
        <AppRoutes />
      </main>
    </div>
  )
}

export default App
