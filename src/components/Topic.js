import styles from "./topic.module.css";
import { MinusCircle, PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { useModalContext } from "hooks/useModalContext";

const Topic = ({
  disciplineCode: discipline,
  branchCode: branch,
  levelCode: level,
  topicId: topic,
  skillLevel,
  name,
  description,
  userIndex,
}) => {
  const router = useRouter();
  const { openModal, setModalData, skillLevelRange } = useModalContext();
  const { maxSkillLevel, minSkillLevel } = skillLevelRange;

  const topicData = {
    userIndex,
    discipline,
    branch,
    level,
    topic,
    skillLevel,
  };

  const changeSkillLevel = async (data, skillLevelReceived) => {
    const dataCopy = data;
    dataCopy.skillLevel = skillLevelReceived;
    try {
      const response = await fetch(`http://localhost:3000/api/test`, {
        method: "PATCH",
        body: JSON.stringify(dataCopy),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newData = await response.json();
      console.log(newData);
      router.replace(router.asPath, undefined, { scroll: false });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    setModalData({
      title: name,
      text: description,
      skillLevel,
    });
    openModal();
  };

  if (skillLevel > maxSkillLevel) {
    changeSkillLevel(topicData, maxSkillLevel);
  }

  const handleDecrease = () => {
    if (skillLevel > minSkillLevel) {
      changeSkillLevel(topicData, skillLevel - 1);
    }
    return;
  };
  const handleIncrease = () => {
    if (skillLevel < maxSkillLevel) {
      changeSkillLevel(topicData, skillLevel + 1);
    }
    return;
  };
  return (
    <div className={styles.topic}>
      <MinusCircle onClick={handleDecrease} />
      <span className={styles.topicInner} onClick={handleOpenModal}>
        {name} [{skillLevel}/{maxSkillLevel}]
      </span>
      <PlusCircle onClick={handleIncrease} />
    </div>
  );
};

export default Topic;
