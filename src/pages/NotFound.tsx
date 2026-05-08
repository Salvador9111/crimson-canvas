import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA]">
      <div className="text-center animate-fade-up">
        <h1 className="mb-4 text-5xl font-bold tracking-tight">404</h1>
        <p className="mb-6 text-lg text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-sm font-medium text-foreground underline underline-offset-4 transition-opacity duration-300 hover:opacity-60">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
