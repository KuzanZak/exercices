import * as countryService from "../services/countryService.js";

export const getAllFull = (req, res) => {
  try {
    const countries = countryService.getAllCountries();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors du chargement des données" });
  }
};

export const getAllNormal = (req, res) => {
  try {
    const countries = countryService.getAllCountries();
    const filtered = countries.map((c) => countryService.filterNormal(c));
    res.status(200).json(filtered);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors du chargement des données" });
  }
};

export const getAllShort = (req, res) => {
  try {
    const countries = countryService.getAllCountries();
    const filtered = countries.map((c) => countryService.filterShort(c));
    res.status(200).json(filtered);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors du chargement des données" });
  }
};

export const getByCode = (req, res) => {
  try {
    const { code } = req.params;

    const country = countryService.getCountryByCode(code);

    if (!country) {
      return res.status(404).json({ error: "Pays non trouvé" });
    }

    const filtered = countryService.filterNormal(country);

    res.status(200).json(filtered);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors du chargement des données" });
  }
};
