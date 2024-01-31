import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});
UserContext.displayName = "UserContext";

export const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
 
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3000/users");

      setUsers(await response.json());
    };
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users }}>
      {children}
    </UserContext.Provider>
  );
};
