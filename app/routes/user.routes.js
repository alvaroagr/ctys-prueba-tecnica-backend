const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const movieController = require("../controllers/movie.controller");
const roomController = require("../controllers/room.controller");
const scheduleController = require("../controllers/schedule.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/cli",
    [authJwt.verifyToken, authJwt.isClient],
    controller.clientBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.post(
    "/api/movies",
    [authJwt.verifyToken, authJwt.isAdmin],
    movieController.addMovie
  );
  app.get(
    "/api/rooms",
    [authJwt.verifyToken, authJwt.isClientOrAdmin],
    roomController.getRooms
  );
  app.get(
    "/api/movies",
    [authJwt.verifyToken, authJwt.isClientOrAdmin],
    movieController.getMovies
  );
  app.get(
    "/api/movies/:id",
    [authJwt.verifyToken, authJwt.isClientOrAdmin],
    movieController.getMovie
  );


  app.get(
    "/api/movies/:movieId/schedules",
    [authJwt.verifyToken, authJwt.isClientOrAdmin],
    scheduleController.getSchedulesByMovieId
  );
  app.post(
    "/api/schedules",
    [authJwt.verifyToken, authJwt.isAdmin],
    scheduleController.addSchedule
  );
};
