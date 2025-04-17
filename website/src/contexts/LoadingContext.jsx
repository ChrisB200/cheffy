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

  const changeLoading = (loading) => {
    setLoading(loading)
  }

  return (
    <LoadingContext.Provider value={{ loading, setLoadingTrue, setLoadingFalse, toggleLoading, changeLoading}}>
      {children}
    </LoadingContext.Provider>
  )
}
