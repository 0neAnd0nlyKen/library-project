import express from 'express'
import prisma from '../database.js'

const router = express.Router()

router.get('/books', async (req, res) => {
  // Mengambil semua buku dari database menggunakan Prisma Client
  const books = await prisma.books.findMany()
  //json response
  res.json(books)
})


router.get('/books/:id', async (req, res) => {
  // Mendapatkan ID buku yang akan diupdate dari parameter URL
  // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
  const id = parseInt(req.params.id)

  // Mengambil buku dengan ID yang sesuai dari database menggunakan Prisma Client
  const book = await prisma.books.findUnique({
    where: {
      id: id
    }
  })

  // Jika buku tidak ditemukan, kirimkan pesan error
  if (!book) {
    res.send(`Book with ID: ${id} not found`)
  }

  res.send(book)
})

router.post('/books', async (req, res) => {
  // Mendapatkan data buku baru dari request body
  const { title, author, year } = req.body

  // Menambahkan buku baru ke database menggunakan Prisma Client
  const book = await prisma.books.create({
    data: {
      title,
      author,
      year
    }
  })



  res.send('Book created successfully')
})
// PUT
router.put('/books/:id', async (req, res) => {
  // Mendapatkan ID buku yang akan diupdate dari parameter URL
  // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
  const id = parseInt(req.params.id)

  // Mendapatkan data buku yang akan diupdate dari request body
  const { title, author, year } = req.body

  // Mencari buku dengan ID yang sesuai di database menggunakan Prisma Client
  const book = await prisma.books.findUnique({
    where: {
      id: id
    }
  })

  // Jika buku tidak ditemukan, kirimkan pesan error
  if (!book) {
    res.send(`Book with ID: ${id} not found`)
    return
  }

  // Mengupdate buku dengan ID yang sesuai di database menggunakan Prisma Client
  await prisma.books.update({
    where: {
      id: id
    },
    data: {
      title,
      author,
      year
    }
  })

  res.send(`Book with ID: ${id} updated successfully`)
})
// DELETE
router.delete('/books/:id', async (req, res) => {
  // Mendapatkan ID buku yang akan diupdate dari parameter URL
  // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
  const id = parseInt(req.params.id)

  // Mencari buku dengan ID yang sesuai di database menggunakan Prisma Client
  const book = await prisma.books.findUnique({
    where: {
      id: id
    }
  })

  // Jika buku tidak ditemukan, kirimkan pesan error
  if (!book) {
    res.send(`Book with ID: ${id} not found`)
    return
  }

  // Menghapus buku dengan ID yang sesuai di database menggunakan Prisma Client
  await prisma.books.delete({
    where: {
      id: id
    }
  })

  res.send(`Book with ID: ${id} deleted successfully`)
})

export default router
