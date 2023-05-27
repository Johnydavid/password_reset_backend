const express = require ("express");
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
require("dotenv").config();
const connection = require("./db");

const port = Number(process.env.PORT) || 3001

app.listen(port, ()=>console.log(`server is running on port ${port}`));

// Database Connection
connection();
