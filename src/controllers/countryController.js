import * as countryService from "../services/countryService.js";
import logger from "../config/logger.js";

const validateCCA3Code = (code) => {
  return /^[a-zA-Z]{3}$/.test(code);
};

const validatePopulation = (population) => {
  return (
    typeof population === "number" &&
    Number.isFinite(population) &&
    population >= 0
  );
};

export const getAllFull = (req, res) => {
  try {
    const countries = countryService.getAllCountries();
    logger.info(`Returned ${countries.length} countries (full version)`);
    res.status(200).json(countries);
  } catch (error) {
    logger.error(`Error loading countries (full): ${error.message}`);
    res.status(500).json({ error: "Erreur lors du chargement des données" });
  }
};

export const getAllNormal = (req, res) => {
  try {
    const countries = countryService.getAllCountries();
    const filtered = countries.map((c) => countryService.filterNormal(c));
    logger.info(`Returned ${filtered.length} countries (normal version)`);
    res.status(200).json(filtered);
  } catch (error) {
    logger.error(`Error loading countries (normal): ${error.message}`);
    res.status(500).json({ error: "Erreur lors du chargement des données" });
  }
};

export const getAllShort = (req, res) => {
  try {
    const countries = countryService.getAllCountries();
    const filtered = countries.map((c) => countryService.filterShort(c));
    logger.info(`Returned ${filtered.length} countries (short version)`);
    res.status(200).json(filtered);
  } catch (error) {
    logger.error(`Error loading countries (short): ${error.message}`);
    res.status(500).json({ error: "Erreur lors du chargement des données" });
  }
};

export const getByCode = (req, res) => {
  try {
    const { code } = req.params;

    if (!validateCCA3Code(code)) {
      logger.warn(`Invalid code format: ${code}`);
      return res.status(400).json({
        error:
          "Format de code invalide. Le code CCA3 doit contenir exactement 3 lettres",
      });
    }

    const country = countryService.getCountryByCode(code);

    if (!country) {
      logger.info(`Country not found: ${code}`);
      return res.status(404).json({ error: "Pays non trouvé" });
    }

    const filtered = countryService.filterNormal(country);
    logger.info(`Returned country: ${code}`);
    res.status(200).json(filtered);
  } catch (error) {
    logger.error(`Error loading country ${req.params.code}: ${error.message}`);
    res.status(500).json({ error: "Erreur lors du chargement des données" });
  }
};

export const updatePopulation = (req, res) => {
  try {
    const { code } = req.params;
    const { population } = req.body;

    if (!validateCCA3Code(code)) {
      logger.warn(`Invalid code format: ${code}`);
      return res.status(400).json({
        error:
          "Format de code invalide. Le code CCA3 doit contenir exactement 3 lettres",
      });
    }

    if (!validatePopulation(population)) {
      logger.warn(`Invalid population value: ${population} for ${code}`);
      return res.status(400).json({
        error: "La population doit être un nombre positif valide",
      });
    }

    const updated = countryService.updateCountryPopulation(code, population);

    if (!updated) {
      logger.info(`Country not found for update: ${code}`);
      return res.status(404).json({ error: "Pays non trouvé" });
    }

    logger.info(`Population updated successfully for ${code}: ${population}`);
    res.status(200).json(countryService.filterNormal(updated));
  } catch (error) {
    logger.error(
      `Error updating population for ${req.params.code}: ${error.message}`,
    );
    res.status(500).json({ error: "Erreur lors de la mise à jour" });
  }
};
