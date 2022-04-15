const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = (passTimes) => {
  for (const passTime of passTimes) {
    var localTime = new Date(0);
    localTime.setUTCSeconds(passTime.risetime);
    console.log(`Next pass at ${localTime} for ${passTime.duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log(`fetch Pass Times Error: ${error}`);
  }

  printPassTimes(passTimes);
});