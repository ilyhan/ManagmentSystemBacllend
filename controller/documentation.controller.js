const documentationService = require("../services/documentation.service");

class DocumentationController {
    async getAllSpaces(_, res) {
        try {
            const spaces = await documentationService.getAllSpaces();
            return res.status(201).json(spaces);
        } catch (e) {
            return res.status(500).json({ error: "Произошла ошибка получения данных", message: e.message });
        }
    }

    async getSpace(req, res) {
        try {
            const { id } = req.params;
            const space = await documentationService.getSpace(id);
            return res.status(201).json(space);
        } catch (e) {
            return res.status(500).json({ error: "Произошла ошибка получения данных", message: e.message });
        }
    }

    async createSpace(req, res) {
        try {
            const space = await documentationService.createSpace(req.body);
            return res.status(201).json(space);
        } catch (e) {
            return res.status(500).json({ error: "Произошла ошибка получения данных", message: e.message });
        }
    }

    async updateSpace(req, res) {
        try {
            const { id } = req.params;
            const space = await documentationService.updateSpace(req.body, id);
            return res.status(201).json(space);
        } catch (e) {
            return res.status(500).json({ error: "Произошла ошибка получения данных", message: e.message });
        }
    }

    async deleteSpace(req, res) {
        try {
            const { id } = req.params;
            const space = await documentationService.deleteSpace(id);
            return res.status(201).json(space);
        } catch (e) {
            return res.status(500).json({ error: "Произошла ошибка получения данных", message: e.message });
        }
    }

    async getChapter(req, res) {
        try {
            const { id } = req.params;
            const chapter = await documentationService.getChapter(id);
            return res.status(201).json(chapter);
        } catch (e) {
            return res.status(500).json({ error: "Произошла ошибка получения данных", message: e.message });
        }
    }

    async createChapter(req, res) {
        try {
            const chapter = await documentationService.createChapter(req.body);
            return res.status(201).json(chapter);
        } catch (e) {
            return res.status(500).json({ error: "Произошла ошибка получения данных", message: e.message });
        }
    }

    async updateChapter(req, res) {
        try {
            const { id } = req.params;
            const chapter = await documentationService.updateChapter(req.body, id);
            return res.status(201).json(chapter);
        } catch (e) {
            return res.status(500).json({ error: "Произошла ошибка получения данных", message: e.message });
        }
    }

    async deleteChapter(req, res) {
        try {
            const { id } = req.params;
            const chapter = await documentationService.deleteChapter(id);
            return res.status(201).json(chapter);
        } catch (e) {
            return res.status(500).json({ error: "Произошла ошибка получения данных", message: e.message });
        }
    }
}

module.exports = new DocumentationController();
