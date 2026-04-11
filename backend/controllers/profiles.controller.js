// profiles.controller.js

import prisma from '../configs/database.config.js'

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await prisma.profiles.findMany({
      include: {
        user: true
      }
    })
    res.json(profiles)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getProfileById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    const profile = await prisma.profiles.findUnique({
      where: {
        id: id
      },
      include: {
        user: true
      }
    })

    if (!profile) {
      return res.status(404).json({ error: `Profile with ID: ${id} not found` })
    }

    res.json(profile)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const createProfile = async (req, res) => {
  try {
    const { userId, address, phone } = req.body

    const profile = await prisma.profiles.create({
      data: {
        userId,
        address,
        phone
      },
      include: {
        user: true
      }
    })

    res.status(201).json({ message: 'Profile created successfully', profile })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { address, phone } = req.body

    const profile = await prisma.profiles.update({
      where: {
        id: id
      },
      data: {
        address,
        phone
      },
      include: {
        user: true
      }
    })

    res.json({ message: 'Profile updated successfully', profile })
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: `Profile with ID: ${id} not found` })
    }
    res.status(500).json({ error: error.message })
  }
}

export const deleteProfile = async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    await prisma.profiles.delete({
      where: {
        id: id
      }
    })

    res.json({ message: 'Profile deleted successfully' })
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: `Profile with ID: ${id} not found` })
    }
    res.status(500).json({ error: error.message })
  }
}