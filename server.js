const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var bcrypt = require("bcryptjs");

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
const User = db.user;
const Movie = db.movie;
const Room = db.room;
var bcrypt = require("bcryptjs");
const Op = db.Sequelize.Op;

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Database with { force: true }");
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "client",
  });

  Role.create({
    id: 3,
    name: "admin",
  });

  User.create({
    id: 1,
    username: "admin",
    email: "admin@mail.com",
    password: bcrypt.hashSync("123456", 8),
  }).then((user) => {
    Role.findAll({
      where: {
        name: {
          [Op.or]: ["user", "admin"],
        },
      },
    }).then((roles) => user.setRoles(roles));
  });
  User.create({
    id: 2,
    username: "client",
    email: "client@mail.com",
    password: bcrypt.hashSync("123456", 8),
  }).then((user) => {
    Role.findAll({
      where: {
        name: {
          [Op.or]: ["user", "client"],
        },
      },
    }).then((roles) => user.setRoles(roles));
  });

  Movie.create({
    id: 1,
    name: "Iron Man",
    description: "La pelicula que inicio el universo cinematografico mas famoso en el plante",
    image: "https://upload.wikimedia.org/wikipedia/en/0/02/Iron_Man_%282008_film%29_poster.jpg"
  })
  Movie.create({
    id: 2,
    name: "Baby Driver",
    description: "Otra pieza de buen cine por parte del director de la trilogia de Cornetto, Edgar Wright",
    image: "https://upload.wikimedia.org/wikipedia/en/8/8e/Baby_Driver_poster.jpg"
  })
  Movie.create({
    id: 3,
    name: "Casablanca",
    description: "Unos la llaman un clasico contemporaneo. Disponible por tiempo limitado.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/CasablancaPoster-Gold.jpg/220px-CasablancaPoster-Gold.jpg"
  })

  Room.create({
    id: 1,
    capacity: 30
  })
  Room.create({
    id: 2,
    capacity: 30
  })
  Room.create({
    id: 3,
    capacity: 50
  })
}
