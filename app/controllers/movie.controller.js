const db = require("../models");
const Movie = db.movie;
const Schedule = db.schedule;

exports.addMovie = (req, res) => {
  Movie.create({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getMovies = (req, res) => {
  Movie.findAll()
    .then((query) => res.send(query))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    const schedules = await Schedule.findAll({
      where: {
        movieId: req.params.id,
      },
    });
    res.send({movie, schedules})
  } catch (error) {
    res.status(500).send({ message: error.message})
  }
};
