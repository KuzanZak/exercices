import express from "express";

const app = express();

const appPort = 3000;

app.get("/", (req, res) => {
  // rendre ça meilleur
  if (process.env.LOG_LEVEL === "debug") {
    console.debug("Debug log: Received a GET request at /");
  }
  res.status(200).send("Coucou");
});

app.get("/countries", (req, res) => {
  res.status(200).send("Pas mal la liste des pays");
});

app.post("/", (req, res) => {
  res.status(200).send("Au revoir");
});

app.listen(appPort, () => {
  console.log(`Server is running on http://localhost:${appPort}.`);
});
