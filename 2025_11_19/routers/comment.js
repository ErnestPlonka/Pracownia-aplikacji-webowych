const express = require("express")
const router = express.Router()
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

router.post("/", async (req, res) => {
    try {
        if (!req.body.content || !req.body.postId) {
            return res.status(400).json({ error: "Brak wymaganych danych" })
        }
        const comment = await prisma.comment.create({ data: req.body })
        res.status(201).json(comment)

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Błąd serwera" })
    }
})

router.get("/", async (req, res) => {
    try {
        const comments = await prisma.comment.findMany()
        res.json(comments)

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Błąd serwera" })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (isNaN(id)) return res.status(400).json({ error: "Nieprawidłowe ID" })

        const comment = await prisma.comment.findUnique({ where: { id } })
        if (!comment) return res.status(404).json({ error: "Nie znaleziono" })

        res.json(comment)

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Błąd serwera" })
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) return res.status(400).json({ error: "Nieprawidłowe ID" })
        const exists = await prisma.comment.findUnique({ where: { id } })
        if (!exists) return res.status(404).json({ error: "Nie znaleziono" })
        const updated = await prisma.comment.update({
            where: { id },
            data: req.body
        })
        res.json(updated)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Błąd serwera" })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) return res.status(400).json({ error: "Nieprawidłowe ID" })
        const exists = await prisma.comment.findUnique({ where: { id } })
        if (!exists) return res.status(404).json({ error: "Nie znaleziono" })
        const deleted = await prisma.comment.delete({ where: { id } })
        res.json(deleted)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Błąd serwera" })
    }
})

module.exports = router
