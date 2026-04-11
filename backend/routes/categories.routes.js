// categories.route.js

import express from 'express'
import {
    getAllCategories,
    getCategoryById,
    getAllBooksByCategoryId,
    createCategory,
    updateCategory,
    deleteCategory
} from '../controllers/categories.controller.js'

const router = express.Router()

router.get('/', getAllCategories)
router.get('/:id', getCategoryById)
router.get('/:id/books', getAllBooksByCategoryId) // buat route baru
router.post('/', createCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

export default router