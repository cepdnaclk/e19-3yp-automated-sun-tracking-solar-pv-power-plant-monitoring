import React, { useState } from "react";
import { DataContext } from "./DataContext";

export function DataProvider({ children }) {
  const [data, setData] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}
