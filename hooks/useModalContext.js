import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "Title",
    text: "Lorem Ipsum Dolor Sit Amet...",
    skillLevel: 0,
    maxSkillLevel: 5,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (event) => {
    event.preventDefault();
    setIsModalOpen(false);
  };
  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        modalData,
        setModalData,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  return useContext(ModalContext);
};
