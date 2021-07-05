module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("rooms", {
      capacity: {
        type: Sequelize.INTEGER,
      },
    });
  
    return Room;
  };
  