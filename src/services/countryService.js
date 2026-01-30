import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let countries = null;

const loadCountries = () => {
  if (!countries) {
    const dataPath = path.join(__dirname, "../../countries.json");
    const data = fs.readFileSync(dataPath);
    countries = JSON.parse(data);
  }
  return countries;
};

export const getAllCountries = () => {
  return loadCountries();
};

export const getCountryByCode = (code) => {
  const allCountries = loadCountries();
  return allCountries.find((c) => c.cca3?.toLowerCase() === code.toLowerCase());
};

export const filterFull = (country) => {
  return country;
};

export const filterNormal = (country) => {
  return {
    name: country.name,
    cca2: country.cca2,
    cca3: country.cca3,
    currencies: country.currencies,
    languages: country.languages,
    flag: country.flag,
    capital: country.capital,
    population: country.population,
    continents: country.continents,
  };
};

export const filterShort = (country) => {
  return {
    name: country.name,
    cca2: country.cca2,
    cca3: country.cca3,
    flag: country.flag,
  };
};
