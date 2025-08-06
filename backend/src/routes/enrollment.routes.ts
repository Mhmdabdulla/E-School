import express from 'express'
import container from '../di/inversify.config'
import  TYPES  from '../di/types'
import { authMiddleware } from '../middlewares/auth.middleware'
import { UserRole } from '../utils/constants'
import { IEnrollmentController } from '../controllers/interfaces/IEnrollmentController'

const router = express.Router()

const enrollmentController = container.get<IEnrollmentController>(TYPES.EnrollmentController)

router.post("/", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), enrollmentController.enroll)
router.get("/", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), enrollmentController.getEnrolledCourses)
router.get("/stats", authMiddleware([UserRole.INSTRUCTOR]), enrollmentController.getInstructorStats)
router.get("/:courseId", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), enrollmentController.getOneEnrolledCourse)
router.get("/:courseId/status", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), enrollmentController.isUserEnrolled)
router.patch("/:courseId/update-lastvisit", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), enrollmentController.updateLastVisitedLesson)
router.post("/:courseId/complete-lesson", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), enrollmentController.completeLesson)
router.get("/:courseId/students", authMiddleware([UserRole.INSTRUCTOR]), enrollmentController.getEnrolledStudentsOfACourse)




export default router