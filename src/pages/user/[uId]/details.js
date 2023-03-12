import User from "models/userSchema";
import connectMongo from "utils/connectMongo";
import { Inter } from "@next/font/google";
import styles from "./detailspage.module.css";
import calculatePercentage from "utils/calculatePercentage";
import { useRouter } from "next/router";

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
  const { userIndex, skillSnapshots } = userData;
  const router = useRouter();

  if (!userData?.name) {
    return (
      <article className={`${inter.className} ${styles.article}`}>
        <header className={styles.header}>
          <h2>Invalid user ID</h2>
        </header>
      </article>
    );
  }

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

      {userData.disciplines.map((discipline) => {
        const { branches, disciplineId } = discipline;

        const branchSkillpointsSummed = branches.map((branch) => {
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

          return calculatePercentage(sum, numberOfTopics, false);
        });

        const labels = branches.map((branch) => {
          const { branchName } = branch;
          return branchName;
        });

        const date = new Date();
        const formattedDate = date.toLocaleDateString();
        const time = date.toLocaleTimeString();

        const savedData = {
          data: branchSkillpointsSummed,
          date: formattedDate,
          time,
        };

        const latestSnapshot = skillSnapshots && skillSnapshots[0];

        const formattedLatestSnapshot = latestSnapshot && {
          label: `Skill mastery ${latestSnapshot.date} ${latestSnapshot.time} [%]`,
          data: latestSnapshot.data,
          fill: true,
          backgroundColor: "rgba(240,100,128,0.2)",
          pointBorderColor: "rgba(240,100,128,0.2)",
          pointBackgroundColor: "rgba(240,100,128,0.2)",
          borderColor: "rgba(36,36,36,0.2)",
          borderWidth: 1,
        };

        const areArraysEqual = (array1, array2) => {
          if (array1.length !== array2.length) return false;
          return array1.every((item, index) => {
            if (item !== array2[index]) return false;
            return true;
          });
        };

        const determineDatasets = () => {
          if (
            !latestSnapshot ||
            areArraysEqual(latestSnapshot.data, savedData.data)
          ) {
            return [
              {
                label: "Skill mastery now [%]",
                data: savedData.data,
                fill: true,
                backgroundColor: "rgba(169, 238, 255, 0.2)",
                pointBorderColor: "#a9eeff",
                pointBackgroundColor: "#a9eeff",
                borderColor: "rgba(36, 36, 36, 0.2)",
                borderWidth: 1,
              },
            ];
          }

          return [
            {
              label: "Skill mastery now [%]",
              data: savedData.data,
              fill: true,
              backgroundColor: "rgba(169, 238, 255, 0.2)",
              pointBorderColor: "#a9eeff",
              pointBackgroundColor: "#a9eeff",
              borderColor: "rgba(36, 36, 36, 0.2)",
              borderWidth: 1,
            },
            formattedLatestSnapshot,
          ];
        };

        const radarData = {
          labels,
          datasets: determineDatasets(),
        };

        const saveData = async () => {
          const newSkillSnapshots = [savedData, ...skillSnapshots].slice(0, 10);
          const body = {
            newSkillSnapshots,
            userIndex,
          };

          try {
            const response = await fetch(`http://localhost:3000/api/snapshot`, {
              method: "PATCH",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const parsedResponse = await response.json();
            console.log(parsedResponse);
            router.replace(router.asPath, undefined, { scroll: false });
          } catch (error) {
            console.log(error);
          }
        };

        return (
          <div
            key={disciplineId}
            style={{
              width: "800px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <h2
              className={styles.save}
              onClick={() => {
                saveData();
              }}
            >
              Save data
            </h2>
            <Radar data={radarData} options={options} />
          </div>
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

export default DetailsPage;
