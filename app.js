let request = require("request");
const chalk = require('chalk');


//basic colors
console.log(chalk.cyan('hey, this is cyan'))
console.log(chalk.green('green '))
console.log(chalk.yellow('I am yellow'))
console.log(chalk.red('I am magenta'))







//weather from darksky

const weather = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/11115f922bc48223ebfcc13d04c1df40/${latitude},${longitude}?units=si`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      console.log("Ooopsss, that's an error");
    } else {
      const data = response.body;
      let icon = data.currently.icon;


      switch (icon) {
        case 'clear-night':
        case 'clear-day':
            console.log(chalk.green('Beautiful Day'))
            break;
        case 'rain':
            console.log(chalk.gray('Rainy weather'))
            break;
        case 'snow':
            console.log(chalk.white('Snowy weather'))
            break;
        case 'sleet':
            console.log(chalk.gray('sleet'))
            break;
        case 'wind':
            console.log(chalk.yellow('Windy'))
            break;
        case 'fog':
            console.log(chalk.gray('fog'))
            break;
        case 'cloudy':
            console.log(chalk.gray('cloudy'))
            break;
        case 'partly-cloudy-night':
        case 'partly-cloudy-day':
            console.log(chalk.gray('Partly cloudy weather'))
            break;
        case 'hail':
            console.log(chalk.bgMagneta('hail'))
            break;
        case 'thunderstorm':
            console.log(chalk.red('Thunderstorm'))
            break;
        case 'tornado':
            console.log(chalk.bgRed('Tornado'))
            break;

        default:

            console.log("Error");
      }
       
    }
  });
};

const geocode = (address, callback) => {
  const url2 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoicm9ja2V0dG93biIsImEiOiJjanQ2ZmEyZnowZjloNDRtd2VtemR3dzZmIn0.JLgxwoeoCASsZ8WDYI3-5A`;

  //latitude and longitude from mapbox
  request({ url: url2, json: true }, (error, response) => {
    if (error) {
      callback("Ooopsss, that's an error", undefined);
    } else if (response.body.features[0].center.lenght == 0) {
      callback("place not found", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      });
    }
  });
};


geocode("clinton", (error, data) => {
  let latitude = data.latitude;
  let longitude = data.longitude;
  console.log("Error:", error);
  console.log("Data:", data);
  weather(latitude, longitude, (error, data) => {
    console.log("Error:", error);
    console.log("Data:", data);
  });
});
