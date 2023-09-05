const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();
const dbPath = path.join(__dirname, "cricketTeam.db");
const db = null;

const intalizeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running at https://localhost:3000");
    });
  } catch (e) {
    console.log(`DB Error! ${e.messaage}`);
    process.exit(1);
  }
};

intalizeDBAndServer();

app.get("/players/", async (request, response) => {
  const getCricketTeam = `
    SELECT 
       * 
    FROM 
      cricket_team
    ORDER BY 
        playerId;`;
  const cricketArray = await db.all(getCricketTeam);
  response.send(cricketArray);
});

module.exports = app;
