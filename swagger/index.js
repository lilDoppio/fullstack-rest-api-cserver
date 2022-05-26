const path = require('path')
const fileURLToPath = require('url')
const swaggerAutogen = require('swagger-autogen')

const doc = {
  info: {
    title: 'Rest API',
    description: 'Rest API test task'
  },
  definitions: {
    Post: {
      id: 1,
      title: 'test Title',
      content: 'test Content',
      userName: 'Author',
      userId: 4,
      image: 'image.jpg',
    },
    Posts: [
      {
        $ref: '#/definitions/Post'
      }
    ],
    Content: {
        title: 'test Title',
        content: 'test Content',
        image: 'image.jpg',
    },
    Changes: {
      changes: {
        id: 1,
        title: 'test Title',
        content: 'test Content',
        userName: 'Author',
        userId: 4,
        image: 'image.jpg',
      }
    },
    DeleteParams: {
      id: 1,
      userId: 4,
    },
    User: {
      id: 1,
      email: 'testUser@mail.ru',
      password: 'testPssword',
      userName: 'test User',
    }
  },
  host: 'localhost:3000',
  schemes: ['http']
}

const outputFile = path.join(__dirname, 'output.json')
const endpointsFiles = [
  path.join(__dirname, '..', 'routes', 'postRouter.js'),
  path.join(__dirname, '..', 'routes', 'userRouter.js'),
]

swaggerAutogen(/*options*/)(outputFile, endpointsFiles, doc).then(
  ({ success }) => {
    console.log(`Generated: ${success}`)
  }
)