import React, { useState } from "react";
import { DataContext } from "./DataContext";

export function DataProvider({ children }) {
  const [data, setData] = useState({
    user_id: "",
    username: "",
    user_type: "",
    user_type_mapper: {
      company: "admin",
      admin: "super-admin",
      customer: "customer",
    },
  });

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}
