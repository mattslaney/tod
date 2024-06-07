"use client";

import React, { useEffect, useState } from "react";
import Auxiliary from "./Auxiliary";
import Sidebar from "./Sidebar";
import Statusbar from "./Statusbar";
import Topbar from "./Topbar";
import View from "./View";
import Modal from "./Modal";

require('../../utils/phoneUtils')

const Main = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  window.addEventListener("PhoneStatus", (e: CustomEventInit) => {
    switch(e.detail.status) {
      case "ringing":
        new Audio('ring.wav').play();
        break;
      default:
        break;
    }
  });

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <main className="flex h-screen flex-col">
        <Topbar />
        <div className="flex flex-1">
          <Sidebar openModal={openModal} />
          <Auxiliary />
          <View />
        </div>
        <Statusbar />
      </main>
      <Modal show={showModal} closeModal={closeModal}>
        {modalContent}
      </Modal>
      </>
  );
};

export default Main;
