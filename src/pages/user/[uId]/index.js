import User from "models/userSchema";
import connectMongo from "utils/connectMongo";
import { Inter } from "@next/font/google";
import styles from "./userpage.module.css";

import Link from "next/link";

import Discipline from "@/components/Discipline";
import Modal from "@/components/Modal";

const inter = Inter({ subsets: ["latin"] });

const UserPage = ({ uId, userData }) => {
  const userIndex = userData && userData.userIndex;

  if (!userData?.name) {
    return (
      <article className={`${inter.className} ${styles.article}`}>
        <header className={styles.header}>
          <h2>Invalid user ID</h2>
        </header>
      </article>
    );
  }

  return (
    <article className={`${inter.className} ${styles.article}`}>
      <Modal />

      <header className={styles.header}>
        <h1>Welcome to the user page of user {uId}</h1>
        <div className={styles.separator}>
          <h2>{userData.name}</h2>
          <div>
            <Link href={`./${uId}/report`}>
              <h2 className={styles.link}>See the user&apos;s report</h2>
            </Link>
            <Link href={`./${uId}/details`}>
              <h2 className={styles.link}>See the user&apos;s radar chart</h2>
            </Link>
          </div>
        </div>
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
