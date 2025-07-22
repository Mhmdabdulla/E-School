import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { UserRole } from '../utils/constants'
import container from '../di/inversify.config'
import { ICategoryController } from '../controllers/interfaces/ICategoryController'
import  TYPES  from '../di/types'

const router = express.Router()

const categoryController = container.get<ICategoryController>(TYPES.CategoryController)

router.get("/",authMiddleware([UserRole.ADMIN,UserRole.INSTRUCTOR]),categoryController.getAllCategories)
router.post("/",authMiddleware([UserRole.ADMIN]),categoryController.createCategory)
router.patch("/:categoryId",authMiddleware([UserRole.ADMIN]),categoryController.updateCategory)
router.patch("/:categoryId/status",authMiddleware([UserRole.ADMIN]),categoryController.toggleCategoryStatus)
router.get("/listed", authMiddleware([UserRole.INSTRUCTOR, UserRole.USER]), categoryController.getListedCategories);


export default router