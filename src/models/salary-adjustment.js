import * as R from 'ramda';

const calculate = R.curry((salary, inflationRate) => {
  const adjustment = salary * (inflationRate / 100);
  const adjustedSalary = salary + adjustment;
  return {
    salary,
    adjustment,
    adjustedSalary,
    inflationRate
  };
});

export { calculate };
