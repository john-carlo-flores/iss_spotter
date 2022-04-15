const request = require('request');

const fetchMyIP = (callback) => {
  const fetchIPURL = "https://api.ipify.org?format=json";

  request(fetchIPURL, (error, response, body) => {
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
  const coordsURL = "https://freegeoip.app/json/";

  request(coordsURL + ip, (error, response, body) => {
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

module.exports = { 
  fetchMyIP,  
  fetchCoordsByIP
};