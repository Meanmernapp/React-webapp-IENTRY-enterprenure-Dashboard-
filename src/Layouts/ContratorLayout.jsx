import React from "react";
import { Outlet } from "react-router-dom";

const ContratorLayout = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default ContratorLayout;
