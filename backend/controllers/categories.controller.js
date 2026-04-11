// categories.controller.js

import prisma from '../configs/database.config.js'

export const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.categories.findMany({
      include: {
        books: true
      }
    })
    res.json(categories)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getCategoryById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    const category = await prisma.categories.findUnique({
      where: {
        id: id
      },
      include: {
        books: true
      }
    })

    if (!category) {
      return res.status(404).json({ error: `Category with ID: ${id} not found` })
    }

    res.json(category)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getAllBooksByCategoryId = async (req, res) => {
  // Mendapatkan ID kategori yang akan diupdate dari parameter URL
  // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
    const id = parseInt(req.params.id)

  // Mengambil kategori dengan ID yang sesuai dari database menggunakan Prisma Client
    const category = await prisma.categories.findUnique({
        where: {
            id: id,
        },
            include: {
            books: true,
        },
    })

  // Jika kategori tidak ditemukan, kirimkan pesan error
    if (!category) {
        return res.json({
        success: false,
        message: `Category with ID: ${id} not found`,
        })
    }

    res.json({
        success: true,
        message: 'Category retrieved successfully',
        data: category,
    })
}

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(400).json({ error: 'Category name is required' })
    }

    const category = await prisma.categories.create({
      data: {
        name
      },
      include: {
        books: true
      }
    })

    res.status(201).json({ message: 'Category created successfully', category })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateCategory = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { name } = req.body

    if (!name) {
      return res.status(400).json({ error: 'Category name is required' })
    }

    const category = await prisma.categories.update({
      where: {
        id: id
      },
      data: {
        name
      },
      include: {
        books: true
      }
    })

    res.json({ message: 'Category updated successfully', category })
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: `Category with ID: ${id} not found` })
    }
    res.status(500).json({ error: error.message })
  }
}

export const deleteCategory = async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    await prisma.categories.delete({
      where: {
        id: id
      }
    })

    res.json({ message: 'Category deleted successfully' })
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: `Category with ID: ${id} not found` })
    }
    res.status(500).json({ error: error.message })
  }
}

