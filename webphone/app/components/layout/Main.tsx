"use client";

import React, { useEffect, useState } from "react";
import Auxiliary from "./Auxiliary";
import Sidebar from "./Sidebar";
import Statusbar from "./Statusbar";
import Topbar from "./Topbar";
import View from "./View";
import Modal from "./Modal";
import { useReadOnlyPhoneSettings } from "@/app/hooks/usePhoneSettings";
import { SimplePhone } from "@/app/utils/phoneUtils";

require('../../utils/phoneUtils')

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

  const phoneSettings = useReadOnlyPhoneSettings();

    useEffect(() => {
    if (phoneSettings.username && phoneSettings.password && phoneSettings.server) {
      console.log(phoneSettings);
      const simplePhone = new SimplePhone(
        phoneSettings.server,
        phoneSettings.username,
        phoneSettings.password
      );

      // Register the phone
      simplePhone.register();

      return () => {
        // Unregister the phone when the component unmounts
        //simplePhone.unregister();
      };
    }
  }, [phoneSettings]);


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
