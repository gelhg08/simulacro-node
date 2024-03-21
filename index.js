const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require('./config/database');
const routes = require("./routes");
const auth = require("./middlewares/auth");

const app = express();
const port = 3005;

// Conecta a la base de datos MongoDB
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(auth.initialize());
// Configura las rutas
app.use("/", routes);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
