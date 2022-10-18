const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class Tracker extends Model {
    static associate(models){
      this.belongsTo(models.Application, {as: "Application"})
    }
  }
  Tracker.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
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
      tracking_id:{
        type: DataTypes.STRING
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: "Tracker",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Tracker
  
}