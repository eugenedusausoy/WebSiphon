const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");

const serviceAccount = require("../keys/websiphon-76804-firebase-adminsdk-ax4uy-fe44b20e6d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://websiphon-76804-default-rtdb.firebaseio.com"
});

const db = admin.database();
const app = express();

app.use(bodyParser.json());

// Endpoint to receive data from frontend
app.post("/save-session-data", (req, res) => {
  const data = req.body;
  console.log("Received data:", data); // Log received data
  db.ref("sessions").push(data)
    .then(() => {
      console.log("Data saved to Firebase"); // Confirm data saved
      res.status(200).send("Data saved successfully!");
    })
    .catch((error) => {
      console.error("Error saving data:", error);
      res.status(500).send("Error saving data");
    });
});


// Start server on a specified port
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

const cors = require("cors");
app.use(cors());