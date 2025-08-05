// Import modules
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { API_PORT } = require("./constants");

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route setup
app.use("/", routes);

// Start Server
app.listen(API_PORT, () => console.log(`Server started on port ${API_PORT}`));
