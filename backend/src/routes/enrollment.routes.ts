import express from 'express'
import container from '../di/inversify.config'
import  TYPES  from '../di/types'
import { authMiddleware } from '../middlewares/auth.middleware'
import { UserRole } from '../utils/constants'
import { IEnrollmentController } from '../controllers/interfaces/IEnrollmentController'

const router = express.Router()

const enrollmentController = container.get<IEnrollmentController>(TYPES.EnrollmentController)

router.post("/", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), enrollmentController.enroll)



export default router