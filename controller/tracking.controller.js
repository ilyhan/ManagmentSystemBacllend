const trackingService = require("../services/tracking.service");

class TrackingController {
    async getMyTrack(req, res) {
        try {
            const { week, year } = req.body;
            const { id } = req.user;

            const track = await trackingService.getMyTrackingTime(week, year, id);
            return res.status(201).json(track);
        } catch (e) {
            return res.status(500).json({ error: "Произошла ошибка получения данных", message: e.message });
        }
    }

    async addNewTrack(req, res) {
        try {
            const { date, description, reservedhours } = req.body;
            const { id } = req.user;

            const track = await trackingService.setNewTrack(date, description, reservedhours, id);
            return res.status(201).json(track);
        } catch (e) {
            return res.status(500).json({ error: "Произошла ошибка получения данных", message: e.message });
        }
    }
}

module.exports = new TrackingController();