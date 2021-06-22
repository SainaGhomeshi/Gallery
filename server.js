// Packages
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");



// Initialize Packages and Set Configs
// import app from Express Module
const app = express();
// Create server using Node Http Module but Based on Express app
const server = require("http").Server(app);

// Import .env Params
require("dotenv").config();
app.use(express.static(path.join(__dirname, "files")))
console.log(path.join(__dirname, "files"))

// Render static files
app.use(express.static('public'));
app.use('/panel/css', express.static(__dirname + 'public/panel/css'))
app.use('/panel/js', express.static(__dirname + 'public/panel/js'))
app.use('/admin/custom/js', express.static(__dirname + 'public/admin/custom/js'))
app.use('/panel/fonts', express.static(__dirname + 'public/panel/fonts'))
app.use('/panel/images', express.static(__dirname + 'public/panel/images'))
app.use('/panel/less', express.static(__dirname + 'public/panel/less'))
app.use('/panel/pages', express.static(__dirname + 'public/panel/pages'))
app.use('/panel/plugins', express.static(__dirname + 'public/panel/plugins'))


//views Engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const URLS = {
    // HOST: process.env.THIS_IS_DOCKER ? 'mongo' : 'localhost',
    HOST: 'localhost',
    SWAGGER: "/v1/saina-gallery-api",
    SWAGGER_OPTIONS: require("./swagger.json"),
};

// handle Images

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(
    "/saina-gallery/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(URLS.SWAGGER_OPTIONS)
);

// Routes
const apiRouter = require("./routes/api");
const customerRouter = require("./routes/customer");
const sellerRouter = require("./routes/seller");
const superAdminRouter = require("./routes/superAdmin");
const adminViewRouter = require("./routes/View/adminView");
const sellerViewRouter = require("./routes/View/sellerView");
const userViewRouter = require("./routes/View/userView");


mongoose
    .connect(
        `mongodb://localhost:27017/SainaGalleryDB`,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        }
    )
    .then(() => {
        // this is the success response for connecting to token
        console.log("Successfully connected to the Database");
    })
    .catch((err) => {
        // if there was an error for connecting token it will bring us here
        console.log("Could not connect to the database. Exiting now...", err);
        // use process.exit() for prevent the app from crash
        process.exit();
    });

// Initialize Api (normal users) Based routers. in first argument pass the url and in the second argument pass the module that handle the URL's
app.use("/api", apiRouter);
app.use("/api/customer", customerRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/superadmin", superAdminRouter);
app.use("/user", userViewRouter);
app.use("/seller", sellerViewRouter);
app.use("/admin", adminViewRouter);

app.get("/", (req, res) => res.send("Everything is ON"));


// handle 404
app.use((req, res, next) => {
    return res.status(404).sendFile(path.join(__dirname + "/public/404.html"));
});

// run the server and listening on the specified port that is defined in .env file
// we are using listen() to run server. in first argument pass the port and second argument will be callback the execute a console.log() with success message

server.listen(process.env.PORT, async () => {
    console.log(`Server is running on port : ${process.env.PORT}`);
    console.log(`Server is On ${URLS.HOST == 'mongodb' ? 'DOCKER' : 'LOCAL'}`)
})
