import express from 'express'
import tutorRouter from './routes/tutor'
import authRouter from './routes/auth'
import petRouter from './routes/pet'
import errorHandlerMiddleware from './middleware/error-handler'
import notFound from './middleware/not-found'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'

const app = express()

//security
app.use(cors())

// Swagger
const swaggerDocument = YAML.load('./swagger.yaml')

// JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// Routes
app.use('/', tutorRouter)
app.use('/auth', authRouter)
app.use('/pet', petRouter)

//Midleware
app.use(errorHandlerMiddleware)
app.use(notFound)

export default app
