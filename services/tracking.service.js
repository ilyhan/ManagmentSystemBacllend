const db = require('../db');
const TRACKING_QUERY = require('../query/tracking.query');

class TrackingService {
    formatDate = (date) => {
        let newDate = date;
        if (!newDate.getFullYear) {
            newDate = new Date(date);
        }

        const y = newDate.getFullYear();
        const m = String(newDate.getMonth() + 1).padStart(2, '0');
        const d = String(newDate.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    getStartEndDayByWeek(week, year) {
        const januaryFirst = new Date(year, 0, 1);
        const januaryFirstDayOfWeek = januaryFirst.getDay();
        const daysToFirstMonday = (januaryFirstDayOfWeek === 1 ? 0 : (8 - januaryFirstDayOfWeek) % 7);
        const firstMonday = new Date(year, 0, 1 + daysToFirstMonday);

        const startDate = new Date(firstMonday);
        startDate.setDate(firstMonday.getDate() + (week - 1) * 7);

        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);

        return [this.formatDate(startDate), this.formatDate(endDate)];
    }

    async getMyTrackingTime(week, year, userId) {
        const trackingDates = this.getStartEndDayByWeek(week, year);
        const tracking = await db.query(TRACKING_QUERY.getTrackByUserId, [...trackingDates, userId]);
        const trackByWeek = tracking.rows;

        const records = trackByWeek.map(row => ({
            ...row,
            date: row.date instanceof Date
                ? new Date(row.date.getTime() + 3 * 60 * 60 * 1000).toISOString().split('T')[0]
                : row.date
        }));

        const result = {};

        records.forEach((item) => {
            if (item && item.date) {
                if (!result[item.date]) {
                    result[item.date] = {
                        date: item.date,
                        data: []
                    };
                }
                result[item.date].data.push(item);
            }
        });

        return Object.values(result);
    }

    async setNewTrack(date, description, reserverTime, userId) {
        const formatedDate = this.formatDate(date);

        // TODO разобраться с бордой, сейчас все в 11 пишется
        const result = await db.query(
            TRACKING_QUERY.addNewTrack,
            [userId, 11, formatedDate, description, reserverTime]
        );

        if (result.rows && result.rows[0]?.id) {
            const data = result.rows[0];
            return {
                ...data,
                date: data.date instanceof Date
                    ? new Date(data.date.getTime() + 3 * 60 * 60 * 1000).toISOString().split('T')[0]
                    : data.date
            };
        }

        throw new Error("Fail add new track");
    }
}

module.exports = new TrackingService();