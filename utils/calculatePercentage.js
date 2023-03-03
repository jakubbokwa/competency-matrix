const calculatePercentage = (
  // This function calculates the percentage of progress for a 'branch' ('branch' in the context of this application is the skillset such as "Javascript", "CSS" etc...) etc.
  // It can be used to calculate the percentages of completion for different levels (junior, mid, senior) or for the whole branch (=different levels summed together)
  // EXAMPLE:
  // ASSUMPTION: the progress of a single skill is on a scale of 1 to 5 [1,2,3,4,5]
  // In this case, if all the skills are assessed at 1/5, the progress is 0%.
  // If all the skills are assessed at 3/5, the progress is 50%.
  // During the calculation of the percentages, both the lower limit and upper limit are adjusted because the lowest value is 1, not 0.
  // In other words: "1 is the new 0"
  // In this example, generally, for N skills, one can accrue maximally (N*5 - N*1 = N*4) points
  // and minimally - 0 points
  summedSkillpoints,
  numberOfTopics,
  returnString = true,
  minSkillLevel = 1,
  maxSkillLevel = 5
) => {
  const skillpointsUpperLimit =
    (maxSkillLevel - minSkillLevel) * numberOfTopics;
  const adjustedSkillpoints =
    summedSkillpoints - numberOfTopics * minSkillLevel;
  const percentage = (adjustedSkillpoints / skillpointsUpperLimit) * 100;
  const formattedPercentage = percentage.toFixed(0);
  if (returnString) {
    return formattedPercentage + "%";
  }
  return parseInt(formattedPercentage);
};

export default calculatePercentage;
