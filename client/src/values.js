export const RainImage = require('./Assets/pictures/rain.jpg').default;
export const CloudImage = require('./Assets/pictures/cloud.jpg').default;
export const ExtremeImage = require('./Assets/pictures/extreme.jpg').default;
export const MistImage = require('./Assets/pictures/mist.jpg').default;
export const SnowImage = require('./Assets/pictures/snow.jpg').default;
export const SunImage = require('./Assets/pictures/sun.jpg').default;
export const StormImage = require('./Assets/pictures/thunderstorm.jpg').default;
export const StormIcon = require('./Assets/icons/storm.svg').default;
export const CloudIcon = require('./Assets/icons/cloudy.svg').default;
export const MistIcon = require('./Assets/icons/mist.svg').default;
export const RainIcon = require('./Assets/icons/rainy.svg').default;
export const SnowIcon = require('./Assets/icons/snowflake.svg').default;
export const SunIcon = require('./Assets/icons/sun.svg').default;
export const ExtremeIcon = require('./Assets/icons/tornado.svg').default;
import allCities from './cities.json';

export const cityChecker = city => {
    let found = allCities.filter(
        allCity => allCity.name.toUpperCase() === city.toUpperCase()
    );
    if (found.length === 0) {
        return false;
    } else {
        return true;
    }
};
export const cityAlreadyAdded = (city, cities) => {
    let found = cities.filter(
        allCity => allCity.toUpperCase() === city.toUpperCase()
    );
    if (found.length === 0) {
        return false;
    } else {
        return true;
    }
};
