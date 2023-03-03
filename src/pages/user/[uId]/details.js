import User from "models/userSchema";
import connectMongo from "utils/connectMongo";
import { Inter } from "@next/font/google";
import styles from "./detailspage.module.css";
import calculatePercentage from "utils/calculatePercentage";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
} from "chart.js";

import { Radar } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler
);

const inter = Inter({ subsets: ["latin"] });

const DetailsPage = ({ userData }) => {
  if (!userData?.name) {
    return (
      <article className={`${inter.className} ${styles.article}`}>
        <header className={styles.header}>
          <h2>Invalid user ID</h2>
        </header>
      </article>
    );
  }

  const data = {
    labels: ["Mon", "Tue", "Wed"],
    datasets: [
      {
        label: "Weekdays",
        data: [3, 6, 9],
        backgroundColor: "aqua",
        borderColor: "black",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return (
    <article className={`${inter.className} ${styles.article}`}>
      <header className={styles.header}>
        <h2>Radar Chart</h2>
        <h2>{userData.name}</h2>
      </header>
      <div style={{ width: "800px", padding: "20px" }}>
        {userData.disciplines.map((discipline) => {
          const { branches, disciplineId } = discipline;
          const summedBranchSkillpointsArray = branches.map((branch) => {
            const { levels } = branch;
            const sum = levels
              .map((level) => {
                const { topics } = level;
                return topics
                  .map((topic) => {
                    const { skillLevel } = topic;
                    return skillLevel;
                  })
                  .reduce((partialSum, nextItem) => {
                    return partialSum + nextItem;
                  }, 0);
              })
              .reduce((partialSum, nextItem) => {
                return partialSum + nextItem;
              }, 0);

            const numberOfTopics = levels
              .map((level) => {
                const { topics } = level;
                return topics.length;
              })
              .reduce((partialSum, nextItem) => {
                return partialSum + nextItem;
              }, 0);

            console.log("number of topics: ", numberOfTopics);
            console.log("sum: ", sum);
            console.log(calculatePercentage(sum, numberOfTopics, false));

            return calculatePercentage(sum, numberOfTopics, false);
          });
          const branchNamesArray = branches.map((branch) => {
            const { branchName } = branch;
            return branchName;
          });

          const radarData = {
            labels: branchNamesArray,
            datasets: [
              {
                label: "Skill mastery [%]",
                data: summedBranchSkillpointsArray,
                fill: true,
                backgroundColor: "rgba(169, 238, 255, 0.2)",
                pointBorderColor: "#a9eeff",
                pointBackgroundColor: "#a9eeff",
                borderColor: "rgba(36, 36, 36, 0.2)",
                borderWidth: 1,
              },
            ],
          };

          return (
            <Radar
              key={disciplineId}
              data={radarData}
              options={options}
            ></Radar>
          );
        })}
      </div>
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

export default DetailsPage;
