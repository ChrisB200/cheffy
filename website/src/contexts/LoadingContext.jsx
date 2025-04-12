import { useState, createContext } from "react";

export const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const toggleLoading = () => {
    if (loading === true) {
      setLoading(false);
    } else {
      setLoading(true)
    }
  }

  const setLoadingTrue = () => {
    setLoading(true);
  }

  const setLoadingFalse = () => {
    setLoading(false);
  }

  return (
    <LoadingContext.Provider value={{ loading, setLoading, setLoadingTrue, setLoadingFalse, toggleLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}
