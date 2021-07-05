const db = require("../models");
const Room = db.room;

exports.getRooms = (req, res) => {
    Room.findAll()
      .then((query) => res.send(query))
      .catch((err) => res.status(500).send({ message: err.message }));
  };