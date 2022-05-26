const Router = require('express')
const router = new Router()
const postController = require('../controllers/postController')


router.post('/',
    // #swagger.description = 'Create new post'
        /* #swagger.parameters['text'] = {
            in: 'body',
            description: 'New todo content',
            type: 'object',
            required: true,
            schema: { $ref: '#/definitions/Content' }
        } */
        /* #swagger.responses[201] = {
            description: 'Array of new posts or empty array',
            schema: { $ref: '#/definitions/Content' }
        } */
    postController.create
)
router.get('/', 
    // #swagger.description = 'Get all posts'
        /* #swagger.responses[200] = {
            description: 'Array of all posts',
            schema: { $ref: '#/definitions/Posts' }
        } */
    postController.getAll
)
router.put('/', 
    // #swagger.description = 'Update existing todo'
        /* #swagger.parameters['id'] = {
            in: 'body',
            description: 'Existing post ID',
            type: 'number',
            required: true,
            schema: { $ref: '#/definitions/Changes' }
        } */
        /* #swagger.parameters['changes'] = {
            in: 'body',
            description: 'Existing post changes',
            type: 'object',
            required: true,
            schema: { $ref: '#/definitions/Changes' }
        } */
        /* #swagger.responses[201] = {
            description: 'Array of new Posts',
            schema: { $ref: '#/definitions/Posts' }
        } */
    postController.uperset
)
router.delete('/', 
    // #swagger.description = 'Remove existing post'
        /* #swagger.parameters['id', 'userId'] = {
            in: 'body',
            description: 'Existing post ID and valid userId',
            type: 'number',
            required: true,
            schema: { $ref: '#/definitions/DeleteParams' }
        } */
        /* #swagger.responses[201] = {
            description: 'Array of new posts or empty array',
            schema: { $ref: '#/definitions/Posts' }
        } */
    postController.deleteOne
)


module.exports = router