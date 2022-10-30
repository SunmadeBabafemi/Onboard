const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class University extends Model {
    static associate(models){
      this.hasMany(models.Program, {as: "Program", onDelete: "SET NULL"})
    }
  }
  University.init(
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
      description: {
        type: DataTypes.STRING,
      },
      picture:{
        type: DataTypes.STRING,
      },
      picture_2:{
        type: DataTypes.STRING,
      },
      picture_3:{
        type: DataTypes.STRING,
      },
      picture_4:{
        type: DataTypes.STRING,
      },
      address:{
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      ratings:{
        type: DataTypes.INTEGER
      },
      added_by: {
        type: DataTypes.STRING,
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: "University",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return University
}