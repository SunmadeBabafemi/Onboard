const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Course extends Model {
    static associate(models){
      this.belongsTo(models.University, {as: "University"})
      this.belongsTo(models.Program, {as: "Program"})

    }
  }
  Course.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name:{
        type: DataTypes.STRING,
      },
       description:{
        type: DataTypes.STRING,
      },

      tuition: {
        type: DataTypes.INTEGER,
      },
      duration: {
        type: DataTypes.STRING,
      },
      application_fees: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
    },
    {
      sequelize,
      modelName: "Course",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Course
}
