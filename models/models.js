const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    userName: {type: DataTypes.STRING, allowNull: false}
})

const Post = sequelize.define('post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    content: {type: DataTypes.STRING, allowNull: false},
    image: {type: DataTypes.STRING},
    date: {type: DataTypes.STRING, allowNull: false},
    userName: {type: DataTypes.STRING, allowNull: false}
})

User.hasOne(Post)
Post.belongsTo(User)

module.exports = {
    Post,
    User
}