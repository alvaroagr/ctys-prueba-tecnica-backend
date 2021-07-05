module.exports = (sequelize, Sequelize) => {
    const Movie = sequelize.define("movies", {
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      image: {
        type: Sequelize.STRING,
      },
    });
  
    return Movie;
  };
  