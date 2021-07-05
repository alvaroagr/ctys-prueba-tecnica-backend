module.exports = (sequelize, Sequelize) => {
    const Schedule = sequelize.define("schedules", {
      startTime: {
        type: Sequelize.DATE,
      },
      endTime: {
        type: Sequelize.DATE,
      },
    });
  
    return Schedule;
  };
  