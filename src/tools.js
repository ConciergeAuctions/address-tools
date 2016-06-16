import data from '../data.json';

const returnOneOrMore = found => found.length === 1 ? found[0] : found;

const compareLowerCase = (a, b) => a && b && a.toLowerCase() === b.toLowerCase();
const closeProximity = (a, b) => a && b && a.toLowerCase().startsWith(b.toLowerCase());

export const findByZip = zip => returnOneOrMore(data.filter(item => item.zip === zip));

export const citiesInCounty = county => returnOneOrMore(
  data
    .filter(item => compareLowerCase(item.county, county) || closeProximity(item.county, county))
    .reduce((previous, current) => {
      if (previous.find(i => i.primary_city === current.primary_city)) return previous;
      previous.push(current);
      return previous;
    },[])
    .map(i => i.primary_city)
);
