import User from "models/userSchema";
import connectMongo from "utils/connectMongo";
import { Inter } from "@next/font/google";
import styles from "./userpage.module.css";

import Discipline from "@/components/Discipline";
import Modal from "@/components/Modal";

import { ModalProvider } from "hooks/useModalContext";

const inter = Inter({ subsets: ["latin"] });

const UserPage = ({ uId, userData }) => {
  const { userIndex } = userData;

  return (
    <ModalProvider>
      <article className={`${inter.className} ${styles.article}`}>
        <Modal />

        <header className={styles.header}>
          <h1>Welcome to the user page of user {uId}</h1>
          <h2>{userData?.name || "Invalid user ID"}</h2>
        </header>

        {userData &&
          userData.disciplines.map((discipline) => {
            const { disciplineId, disciplineName, disciplineCode, branches } =
              discipline;
            return (
              <Discipline
                key={disciplineId}
                name={disciplineName}
                branches={branches}
                disciplineCode={disciplineCode}
                userIndex={userIndex}
              />
            );
          })}
      </article>
    </ModalProvider>
  );
};

export async function getServerSideProps(context) {
  try {
    const { params } = context;
    const uId = params.uId;
    await connectMongo();
    const user = await User.findOne({ userIndex: uId }).exec();
    const parsedUser = JSON.parse(JSON.stringify(user));
    return {
      props: {
        uId,
        userData: parsedUser,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log(error);
  }
}

export default UserPage;
