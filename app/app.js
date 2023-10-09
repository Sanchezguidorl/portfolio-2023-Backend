const express = require('express');
const cors = require('cors');
const app = express();
const studiesRoutes= require('./routes/studies.routes');
const projectsRoutes= require('./routes/projects.routes');
const userRoutes= require('./routes/user.routes');
const bodyParser = require("body-parser");

const bodyParserOptions = {
  limit: "50mb",
};

app.use(express.json(bodyParserOptions));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true, limit: "50mb" }));
app.use(studiesRoutes);
app.use(userRoutes);
app.use(projectsRoutes);

module.exports = app;