const request = require('request');

const fetchMyIP = (callback) => {
  const url = "https://api.ipify.org?format=json";

  request(url, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const data = JSON.parse(body);
    callback(null, data.ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  const url = "https://freegeoip.app/json/";

  request(url + ip, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching fly over times. Response: ${response}`;
      return callback(Error(msg), null);
    }

    const data = JSON.parse(body);
    callback(null, data.response);
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return console.log(`fetch IP Error: ${error}`);
    }
  
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return console.log(`fetch Coords Error: ${error}`);
      }
  
      fetchISSFlyOverTimes(coords, (error, times) => {
        if (error) {
          return console.log(`fetch Fly Over Times Error: ${error}`);
        }
    
        callback(null, times);
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation
};