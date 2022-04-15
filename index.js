const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = (passTimes) => {
  for (const passTime of passTimes) {
    console.log(`Next pass at ${Date(passTime.risetime)} for ${passTime.duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log(`fetch Pass Times Error: ${error}`);
  }

  printPassTimes(passTimes);
});