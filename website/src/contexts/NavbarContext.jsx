import { createContext, useState, useEffect, useRef} from "react";

export const NavbarContext = createContext(null);

export const NavbarProvider = ({ children }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const userToggledRef = useRef(false);

  const toggleNavbar = () => {
    setIsNavbarOpen((prev) => !prev);
  };


  const userToggleNavbar = () => {
    userToggledRef.current = true;
    toggleNavbar();
  };

  useEffect(() => {
    const handleResize = () => {
      if (!userToggledRef.current) {
        if (window.innerWidth <= 1100) {
          setIsNavbarOpen(false);
        } else {
          setIsNavbarOpen(true);
        }
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <NavbarContext.Provider value={{ isNavbarOpen, toggleNavbar, userToggleNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};
