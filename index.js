const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    return console.log(`fetch IP Error: ${error}`);
  }

  // return console.log(`External IP Address: ${ip}`);
  fetchCoordsByIP(ip, (error, data) => {
    if (error) {
      return console.log(`fetch Coords Error: ${error}`);
    }

    fetchISSFlyOverTimes(data, (error, data) => {
      if (error) {
        return console.log(`fetch Fly Over Times Error: ${error}`);
      }

      console.log(data);
    });
  });
});