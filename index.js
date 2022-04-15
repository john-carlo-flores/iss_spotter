const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    return console.log(`fetch IP Error: ${error}`);
  }

  // return console.log(`External IP Address: ${ip}`);
  fetchCoordsByIP(ip, (error, data) => {
    if (error) {
      return console.log(`fetch IP Error: ${error}`);
    }

    console.log(data.longitude);
    console.log(data.latitude);
  });
});

