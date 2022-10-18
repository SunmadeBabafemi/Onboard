const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Program extends Model {
    static associate(models){
      this.belongsTo(models.University, {as: "University"})
      this.hasMany(models.Course, {as: "Course"})

    }
  }
  Program.init(
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
      duration: {
        type: DataTypes.STRING,
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
    },
    {
      sequelize,
      modelName: "Program",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Program
}
