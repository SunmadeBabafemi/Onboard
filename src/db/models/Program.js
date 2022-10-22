const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Program extends Model {
    static associate(models){
      this.belongsTo(models.University, {as: "University", onDelete: 'NO ACTION'})
      this.hasMany(models.Course, {as: "Course", onDelete: 'SET NULL'})

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
        type:DataTypes.INTEGER,
      },
      added_by:{
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
