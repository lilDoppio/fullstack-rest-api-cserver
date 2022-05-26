const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration',
    // #swagger.description = 'Create new post'
        /* #swagger.parameters['user'] = {
            in: 'body',
            description: 'New user registration',
            type: 'object',
            required: true,
            schema: { $ref: '#/definitions/User' }
        } */
        /* #swagger.responses[201] = {
            description: 'User created',
            schema: { $ref: '#/definitions/User' }
        } */
    userController.registration
)

router.post('/login',
    // #swagger.description = 'Create new post'
        /* #swagger.parameters['user'] = {
            in: 'body',
            description: 'User login',
            type: 'object',
            required: true,
            schema: { $ref: '#/definitions/User' }
        } */
        /* #swagger.responses[201] = {
            description: 'User successfully login',
            schema: { $ref: '#/definitions/User' }
        } */
    userController.login
)

router.get('/auth', authMiddleware, 
    // #swagger.description = 'Create new post'
        /* #swagger.parameters['user'] = {
            in: 'body',
            description: 'User login check',
            type: 'object',
            required: true,
            schema: { $ref: '#/definitions/User' }
        } */
    userController.check
)

module.exports = router