import express from "express";
import countryRoutes from "./routes/countryRoutes.js";
import logger from "./config/logger.js";

const app = express();

const appPort = 3000;

app.use(express.json());

app.use("/api/countries", countryRoutes);

app.listen(appPort, () => {
  logger.info(`Server is running on http://localhost:${appPort}`);
});
