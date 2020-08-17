global.loggedIn = null;

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const flash = require("connect-flash");
const newPostController = require("../controllers/newPost");
const mongoConnect = require("../controllers/mongoConnect");
const searchController = require("../controllers/search");
const homeController = require("../controllers/home");
const getPostController = require("../controllers/getPost");
const storePostController = require("../controllers/storePost");
const validationMiddleware = require("../controllers/validationMiddleware");
const message = require("../controllers/message");
const dbConnectParams = require("../controllers/dbConnectParams");
const newUserController = require("../controllers/newUser");
const storeUserController = require("../controllers/storeUser");
const loginController = require("../controllers/login");
const userLoginController = require("../controllers/loginUser");
const authMiddleware = require("../middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("../middleware/redirectIfAuthenticatedMiddleware");
const logoutController = require("../controllers/logout");

const port = process.env.PORT || 3000;

const app = express();
const viewsPath = path.join(__dirname, "../views");

app.set("view engine", "ejs");
app.set("views", viewsPath);

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static("public"));
app.use(
  expressSession({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash())

app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  console.log(loggedIn);
  next();
});

app.use("/posts/store", validationMiddleware);

mongoose.connect(
  'mongodb+srv://user1:31415p2718e@cluster0.366lq.mongodb.net/my_database',
  dbConnectParams,
  mongoConnect
);

app.get("/", homeController);

app.get("/posts/search", searchController);

app.get("/post/:id", getPostController);

app.get("/posts/new", authMiddleware, newPostController);

app.post("/posts/store", authMiddleware, storePostController);

app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);

app.post("/users/register", redirectIfAuthenticatedMiddleware, storeUserController);

app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);

app.post("/users/login", redirectIfAuthenticatedMiddleware, userLoginController);

app.get('/auth/logout', logoutController);

app.use((req, res) => {
  res.render('notfound')
})

app.listen(port, message);
