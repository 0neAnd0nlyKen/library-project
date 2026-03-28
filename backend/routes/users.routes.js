import express from 'express'
import prisma from '../database.js'
import { router } from './router'

const router = express.Router()

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await prisma.users.findMany()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET user by ID
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    const user = await prisma.users.findUnique({
      where: {
        id: id
      }
    })

    if (!user) {
      return res.status(404).json({ error: `User with ID: ${id} not found` })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST create new user
router.post('/', async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password,
        role: role || 'USER'
      }
    })

    res.status(201).json({ message: 'User created successfully', user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// PUT update user
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { name, email, password, role } = req.body

    const user = await prisma.users.findUnique({
      where: {
        id: id
      }
    })

    if (!user) {
      return res.status(404).json({ error: `User with ID: ${id} not found` })
    }

    const updatedUser = await prisma.users.update({
      where: {
        id: id
      },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(password && { password }),
        ...(role && { role })
      }
    })

    res.json({ message: `User with ID: ${id} updated successfully`, user: updatedUser })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    const user = await prisma.users.findUnique({
      where: {
        id: id
      }
    })

    if (!user) {
      return res.status(404).json({ error: `User with ID: ${id} not found` })
    }

    await prisma.users.delete({
      where: {
        id: id
      }
    })

    res.json({ message: `User with ID: ${id} deleted successfully` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
