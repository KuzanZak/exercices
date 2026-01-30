import express from "express";
import * as countryController from "../controllers/countryController.js";

const router = express.Router();

router.get("/full", countryController.getAllFull);
router.get("/normal", countryController.getAllNormal);
router.get("/short", countryController.getAllShort);
router.get("/:code", countryController.getByCode);

export default router;
