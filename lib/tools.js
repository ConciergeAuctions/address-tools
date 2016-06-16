'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.citiesInCounty = exports.findByZip = undefined;

var _data = require('../data.json');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var returnOneOrMore = function returnOneOrMore(found) {
  return found.length === 1 ? found[0] : found;
};

var compareLowerCase = function compareLowerCase(a, b) {
  return a && b && a.toLowerCase() === b.toLowerCase();
};
var closeProximity = function closeProximity(a, b) {
  return a && b && a.toLowerCase().startsWith(b.toLowerCase());
};

var findByZip = exports.findByZip = function findByZip(zip) {
  return returnOneOrMore(_data2.default.filter(function (item) {
    return item.zip === zip;
  }));
};

var citiesInCounty = exports.citiesInCounty = function citiesInCounty(county) {
  return returnOneOrMore(_data2.default.filter(function (item) {
    return compareLowerCase(item.county, county) || closeProximity(item.county, county);
  }).reduce(function (previous, current) {
    if (previous.find(function (i) {
      return i.primary_city === current.primary_city;
    })) return previous;
    previous.push(current);
    return previous;
  }, []).map(function (i) {
    return i.primary_city;
  }));
};