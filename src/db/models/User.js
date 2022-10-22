const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  class User extends Model {
    static associate(models){
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      full_name: {
        type: DataTypes.STRING
      },
      email: {
        unique: true,
        type: DataTypes.STRING,
      },
      phone_number:{
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
      },
      isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      accessTokens: {
        type: DataTypes.STRING
      },
      deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },

    {
      sequelize,
      modelName: "User",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return User
}