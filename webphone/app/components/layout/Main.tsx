import React from "react";
import Auxiliary from "./Auxiliary";
import Sidebar from "./Sidebar";
import Statusbar from "./Statusbar";
import Topbar from "./Topbar";
import View from "./View";

const Main = () => {
  return (
    <main className="flex h-screen flex-col">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <Auxiliary />
        <View />
      </div>
      <Statusbar />
    </main>
  );
};

export default Main;
