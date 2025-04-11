import { createContext, useEffect, useState } from "react";
import httpClient from "../utils/httpClient";
import { BASE_API_URL } from "../utils/constants";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUser = async () => {
    setLoading(true);
    try {
      const response = await httpClient.get(`${BASE_API_URL}/user/current`);
      setUser(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);


  return (
    <UserContext.Provider value={{user, loading, error, setUser, setLoading, setError}}>
      {children}
    </UserContext.Provider>
  );
}
