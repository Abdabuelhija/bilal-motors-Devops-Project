// index.js
const cors = require("cors");
const express = require("express");
const config = require("./services/config");
const db = require("./services/db"); 
const app = express();
const http = require("http").createServer(app);

app.use(express.json());

app.use(cors({
  origin:config.ORIGIN,
  credentials: true
}));

const UserRoutes = require("./routes/admin.route");
app.use("/Admin", UserRoutes);

const carRoutes = require('./routes/cars.route');
app.use('/cars', carRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to bilal-motors server , made by the developer abd abuelhija')
  });
  
http.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
}).on("error", (err) => {
    console.error(`Error starting server: ${err}`);
});