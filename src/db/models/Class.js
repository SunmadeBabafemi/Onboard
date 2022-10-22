const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Class extends Model {
    static associate(models){
      this.belongsTo(models.Course, {as: "Course"})
      this,this.hasMany(models.Application, {as: "Application", onDelete: 'NO ACTION'})
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
      class_year: {
        type: DataTypes.INTEGER,
      },
      class_diet :{
        type: DataTypes.ENUM,
        values:['Winter', 'Summer', 'Spring'],
        defaultValue: 'Winter'
      },
      start_date: {
        type: DataTypes.DATE
      },
      end_date: {
        type: DataTypes.DATE
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      application_opening: {
        type: DataTypes.DATE
      },
      application_closing: {
        type: DataTypes.DATE
      },
      application_fees: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      course_tuition: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      added_by:{
        type: DataTypes.STRING,
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