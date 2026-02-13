export const calculateUserScore = (user) => {
  let score = 0;
  for (let i = 0; i < 1000; i++) {
    score += (user.age * user.salary) / 1000000;
  }
  return Math.round(score * 100) / 100;
};
