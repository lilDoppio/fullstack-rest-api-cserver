require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleWare')
const path = require('path')
const fs = require('fs')
const swaggerUi = require('swagger-ui-express')

const swaggerFile = JSON.parse(fs.readFileSync('./swagger/output.json'))

const PORT = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`PORT: ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()