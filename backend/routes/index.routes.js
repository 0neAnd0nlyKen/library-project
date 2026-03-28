import express from 'express'
import prisma from '../database.js'
import booksRoute from './books.routes.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Welcome to the API Library')
})

router.use(booksRoute)

export default router
