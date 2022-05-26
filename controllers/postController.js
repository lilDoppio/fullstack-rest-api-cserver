const { Post } = require("../models/models")
const uuid = require('uuid')
const path = require('path');
const ApiError = require("../error/ApiError");

class PostController {
    async create(req, res, next) {
        const {title, content, userName, userId, date} = req.body
        if (title.length > 255 
            || content.length > 255) {
            return next(ApiError.badRequest('Заголовок и тило поста не могут содержать больше 255 символов'))
        }
        if (!req.files) {
            const post = await Post.create({title, content, userName, userId, date, image: 'defaultImageState' })
            return res.json(post)
        }
        const {image} = req.files
        let fileName = uuid.v4() + ".jpg"
        image.mv(path.resolve(__dirname, '..', 'static', fileName))
        const post = await Post.create({title, content, userName, userId, date, image: fileName })
        return res.json(post)
    }

    async getAll(req, res) {
        const posts = await Post.findAll()
        return res.json(posts)
    }

    async uperset(req, res, next) {
        const {id, title, content, image, userName, userId, date} = req.body
        if (title.length > 255 
            || content.length > 255) {
            return next(ApiError.badRequest('Заголовок и тило поста не могут содержать больше 255 символов'))
        }
        const post = await Post.upsert({
            id: id,
            title: title,
            content: content,
            image: image,
            userName: userName,
            userId: userId,
            date: date
        });
        return res.json(post)
    }

    async deleteOne(req, res) {
        const { id, userId } = req.body
        const post = Post.destroy({where: {id, userId}})
        return res.json('Deleted')
    }
}

module.exports = new PostController()