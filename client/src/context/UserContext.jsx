import { createContext, useState, useCallback } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  const loadUser = useCallback((userData) => {
    setUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      entries: userData.entries,
      joined: userData.joined,
    });
  }, []);

  const updateEntries = useCallback((newEntries) => {
    setUser((prevUser) => ({
      ...prevUser,
      entries: newEntries,
    }));
  }, []);

  const clearUser = useCallback(() => {
    setUser({
      id: "",
      name: "",
      email: "",
      entries: 0,
      joined: "",
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, loadUser, updateEntries, clearUser }}>
      {children}
    </UserContext.Provider>
  );
}
