import React from "react";
import { Outlet } from "react-router-dom";

const EmployeeLayout = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default EmployeeLayout;
