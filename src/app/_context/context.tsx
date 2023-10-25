"use client";
import { createContext, useContext, useState } from 'react';

export const UserData = createContext({});

function Context({ children }:any) {
  const [user, setUser] = useState();

  return (
    <UserData.Provider value={{ user, setUser }}>
      {children}
    </UserData.Provider>
    
  );
}

export default Context;