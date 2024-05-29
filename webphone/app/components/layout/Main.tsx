"use client";

import React, { useState } from "react";
import Auxiliary from "./Auxiliary";
import Sidebar from "./Sidebar";
import Statusbar from "./Statusbar";
import Topbar from "./Topbar";
import View from "./View";
import Modal from "./Modal";
import { PhoneSettingsProvider } from "@/app/contexts/PhoneSettings";

const Main = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <PhoneSettingsProvider>
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
    </PhoneSettingsProvider>
  );
};

export default Main;
