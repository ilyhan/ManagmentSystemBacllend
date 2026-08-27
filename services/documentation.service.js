const DOCUMENTATION_QUERY = require("../query/documentation.query");
const db = require('../db');

class DocumentationService {
    async getAllSpaces() {
        const spaces = await db.query(DOCUMENTATION_QUERY.getAllSpaces);
        return spaces.rows;
    }

    async createSpace({ name, description }) {
        const spaceByName = await db.query(DOCUMENTATION_QUERY.getSpaceByName, [name]);
        if (spaceByName.rowCount > 0) {
            throw new Error("Пространство с таким названием уже существует");
        }

        const space = await db.query(DOCUMENTATION_QUERY.createSpace, [name, description]);

        if (space.rows.length == 0) {
            throw new Error("Ошибка создания пространства");
        }

        return space.rows[0];
    }

    async updateSpace({ name, description }, id) {
        const space = await db.query(DOCUMENTATION_QUERY.updateSpace, [name, description, id]);

        if (space.rows.length == 0) {
            throw new Error("Пространство не найдено");
        }

        return space.rows[0];
    }

    async deleteSpace(id) {
        const space = await db.query(DOCUMENTATION_QUERY.deleteSpace, [id]);

        if (space.rows.length == 0) {
            throw new Error("Пространство не найдено");
        }

        return space.rows[0];
    }

    async getSpace(id) {
        const space = await db.query(DOCUMENTATION_QUERY.getSpaceById, [id]);

        if (space.rowCount == 0) {
            throw new Error("Пространство не найдено");
        }

        const chapters = await db.query(DOCUMENTATION_QUERY.getChaptersBySpaceId, [id]);

        return { ...space.rows[0], chapters: this.buildChapterTree(chapters.rows) };
    }

    buildChapterTree(chapters, parentId = null) {
        return chapters
            .filter(chapter => chapter.parent_id === parentId)
            .map(chapter => {
                const children = this.buildChapterTree(chapters, chapter.id);
                return { ...chapter, isFolder: children.length > 0, children };
            });
    }

    async getChapter(id) {
        const chapter = await db.query(DOCUMENTATION_QUERY.getChapterById, [id]);

        if (chapter.rows.length == 0) {
            throw new Error("Раздел не найден");
        }

        return chapter.rows[0];
    }

    async createChapter({ space_id, parent_id, name, content, position }) {
        const chapter = await db.query(
            DOCUMENTATION_QUERY.createChapter,
            [space_id, parent_id ?? null, name, content, position ?? 0]
        );

        if (chapter.rows.length == 0) {
            throw new Error("Ошибка создания раздела");
        }

        return chapter.rows[0];
    }

    async updateChapter({ name, content, parent_id, position }, id) {
        const current = await db.query(DOCUMENTATION_QUERY.getChapterById, [id]);

        if (current.rows.length == 0) {
            throw new Error("Раздел не найден");
        }

        const chapter = await db.query(
            DOCUMENTATION_QUERY.updateChapter,
            [
                name ?? current.rows[0].name,
                content ?? current.rows[0].content,
                parent_id !== undefined ? parent_id : current.rows[0].parent_id,
                position !== undefined ? position : current.rows[0].position,
                id
            ]
        );

        return chapter.rows[0];
    }

    async deleteChapter(id) {
        const chapter = await db.query(DOCUMENTATION_QUERY.deleteChapter, [id]);

        if (chapter.rows.length == 0) {
            throw new Error("Раздел не найден");
        }

        return chapter.rows[0];
    }
}

module.exports = new DocumentationService();
