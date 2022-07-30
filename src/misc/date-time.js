const secondsToMiliseconds = x => x * 1000;

const milisecondsToSeconds = x => x / 1000;

const toISODateString = x => {
  const regExp = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = x.match(regExp);
  return `${match[3]}-${match[2]}-${match[1]}`;
};

export {
  secondsToMiliseconds,
  milisecondsToSeconds,
  toISODateString
};
