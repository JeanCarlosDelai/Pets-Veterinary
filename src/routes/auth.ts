import express from 'express'
import AuthController from '../controllers/auth.controler'

const router = express.Router()

router.post('/', AuthController.login)

export default router
