const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Class extends Model {
    static associate(models){
      this.belongsTo(models.Course, {as: "Course"})
    }
  }
  Class.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
      },
      start_date: {
        type: DataTypes.DATE
      },
      end_date: {
        type: DataTypes.DATE
      },
      application_opening: {
        type: DataTypes.DATE
      },
      application_closing: {
        type: DataTypes.DATE
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: "Class",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Class
}