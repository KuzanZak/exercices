import express from "express";
import countryRoutes from "./routes/countryRoutes.js";

const app = express();

const appPort = 3000;

app.use(express.json());

app.use("/api/countries", countryRoutes);

app.listen(appPort, () => {
  console.log(`Server is running on http://localhost:${appPort}.`);
});
