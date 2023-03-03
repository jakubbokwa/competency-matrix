import styles from "./modal.module.css";
import { useModalContext } from "hooks/useModalContext";

const Modal = () => {
  const { isModalOpen, modalData, closeModal, skillLevelRange } =
    useModalContext();
  const { title, text, skillLevel } = modalData;
  const { maxSkillLevel } = skillLevelRange;

  return (
    <div
      className={`${
        isModalOpen ? styles.modalContainer : styles.modalContainerClosed
      }`}
    >
      <div className={styles.overlay} onClick={closeModal}></div>
      <div className={styles.modal}>
        <h2 className={styles.heading}>
          <span>{title}</span>
          <span>
            [{skillLevel}/{maxSkillLevel}]
          </span>
        </h2>
        <div className={styles.delimiter} />
        <p>{text || "Lorem Ipsum Dolor Sit Amet..."}</p>
        <div className={styles.close} onClick={closeModal}>
          Close
        </div>
      </div>
    </div>
  );
};

export default Modal;
