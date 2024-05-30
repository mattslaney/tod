"use client";

import React, { MouseEventHandler, useState } from "react";

interface ModalProps {
  show: boolean;
  closeModal: Function
  children?: React.ReactNode;
}

const Modal = ({ show, closeModal, children }: ModalProps) => {

  const handleClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  return show ? (
    <div
      className={`fixed left-0 top-1 z-[1] flex h-full
      w-full items-center justify-center
    bg-black bg-opacity-35`}
      onClick={handleClose}
    >
      <div className="bg-white text-black dark:bg-gray-950 dark:text-gray-300 rounded-xl p-10">
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
