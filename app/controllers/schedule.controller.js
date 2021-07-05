const db = require("../models");
const Movie = db.movie;
const Schedule = db.schedule;
const User = db.user;

exports.addSchedule = async (req, res) => {
  if (req.body.movie) {
    try {
      const movie = await Movie.create({
        name: req.body.name,
        description: req.body.name,
        image: req.body.name,
      });
      const schedule = await Schedule.create({
        movieId: movie.id,
        roomId: req.body.schedule.roomId,
        startTime: req.body.schedule.startTime,
        endTime: req.body.schedule.endTime,
      });
      res.send(schedule)
    } catch (error) {
      res.status(500).send({ messsage: error.message })
    }
  } else {
    try {
      const schedule = await Schedule.create({
        movieId: req.body.movieId,
        roomId: req.body.roomId,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
      });
      res.send(schedule)
    } catch (error) {
      res.status(500).send({ messsage: error.message })
    }
  }
};

exports.getSchedulesByMovieId = (req, res) => {
  Schedule.findAll({
    where: {
      movieId: req.params.movieId,
    },
  }).then((query) => {
    if (query) {
      res.send(query);
    } else {
      res.status(404).send({ message: "No hay horarios para esta pelicula" });
    }
  });
};

exports.setMySchedule = (req, res) => {
  User.findByPk(req.body.userId)
  .then((user) => {
    Schedule.findByPk(req.body.scheduleId)
    .then((schedule) => {
      user.getSchedules().then((schedules) => {
        user.setSchedules([...schedules, schedule])
        .then((x) => res.send(x))
      })
    }) 
  }
  ).catch((err) => res.status(500).send({ message: "No hay horarios para esta pelicula" }))
}
