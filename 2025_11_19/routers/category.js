const express = require("express")
const router = express.Router()
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
router.post("/", async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({ error: "Nazwa jest wymagana" })
        }
        const category = await prisma.category.create({
            data: { name: req.body.name }
        })
        res.status(201).json(category)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Błąd serwera" })
    }
})

router.get("/", async (req, res) => {
    try {
        const list = await prisma.category.findMany()
        res.json(list)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Błąd serwera" })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) return res.status(400).json({ error: "Nieprawidłowe ID" })
        const category = await prisma.category.findUnique({ where: { id } })
        if (!category) return res.status(404).json({ error: "Nie znaleziono" })
        res.json(category)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Błąd serwera" })
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) return res.status(400).json({ error: "Nieprawidłowe ID" })
        const exists = await prisma.category.findUnique({ where: { id } })
        if (!exists) return res.status(404).json({ error: "Nie znaleziono" })
        const updated = await prisma.category.update({
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
        const exists = await prisma.category.findUnique({ where: { id } })
        if (!exists) return res.status(404).json({ error: "Nie znaleziono" })
        const deleted = await prisma.category.delete({ where: { id } })
        res.json(deleted)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Błąd serwera" })
    }
})

module.exports = router
