import React, { useContext, useState } from "react";

export const UserContext = React.createContext({
  user: null,
  setUser: () => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children, initialUser }) => {
  const [user, setUser] = useState();

  React.useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
  }, [initialUser, setUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
