const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Application extends Model {
    static associate(models){
      this.belongsTo(models.Course, {as: "Course", onDelete: 'NO ACTION'}),
      this.belongsTo(models.Class, {as: "Class", onDelete: 'NO ACTION'})
    }
  }
  Application.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      first_name: {
        type: DataTypes.STRING
      },
      last_name: {
        type: DataTypes.STRING
      },
      middle_name: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.ENUM,
        values: ['male', 'female', 'other'],
        allowNull: true
      },
      nationality:{
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      phone_number:{
        type: DataTypes.STRING,
        allowNull: true
      },
      status:{
        type: DataTypes.ENUM,
        values: [
          'in review', 
          'pending', 
          'granted', 
          'denied'
        ],
        defaultValue: 'pending'
      },
      application_fees: {
        type: DataTypes.INTEGER
      },
      tracking_id: {
        unique: true,
        type: DataTypes.STRING,
      },
      result:{
        type: DataTypes.STRING
      },
      user_id: {
        type: DataTypes.STRING,
      },
      class_year: {
        type: DataTypes.INTEGER
      },
      class_diet: {
        type: DataTypes.STRING,
      },
      course_name: {
        type: DataTypes.STRING,
      },
      program_name: {
        type: DataTypes.STRING,
      },
      school_name: {
        type: DataTypes.STRING,
      },
      access_code: {
        type: DataTypes.STRING
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: "Application",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Application
}