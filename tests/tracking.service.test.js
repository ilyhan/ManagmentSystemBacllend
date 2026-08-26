const trackingService = require("../services/tracking.service");

jest.mock("../db", () => ({
  query: jest.fn(),
}));

const db = require("../db");

describe("TrackingService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("formatDate", () => {
    it("should format a Date object to YYYY-MM-DD", () => {
      const date = new Date(2024, 0, 15);
      expect(trackingService.formatDate(date)).toBe("2024-01-15");
    });

    it("should format an ISO string to YYYY-MM-DD", () => {
      expect(trackingService.formatDate("2024-05-29T10:00:00Z")).toBe("2024-05-29");
    });

    it("should pad single-digit month and day", () => {
      const date = new Date(2024, 0, 1);
      expect(trackingService.formatDate(date)).toBe("2024-01-01");
    });

    it("should handle December date", () => {
      const date = new Date(2024, 11, 31);
      expect(trackingService.formatDate(date)).toBe("2024-12-31");
    });
  });

  describe("getStartEndDayByWeek", () => {
    it("should return correct start and end for week 1 of 2024", () => {
      const [start, end] = trackingService.getStartEndDayByWeek(1, 2024);
      expect(start).toBe("2024-01-01");
      expect(end).toBe("2024-01-07");
    });

    it("should return correct dates for week 2 of 2024", () => {
      const [start, end] = trackingService.getStartEndDayByWeek(2, 2024);
      expect(start).toBe("2024-01-08");
      expect(end).toBe("2024-01-14");
    });

    it("should return correct dates for week 1 of 2023", () => {
      const [start, end] = trackingService.getStartEndDayByWeek(1, 2023);
      expect(start).toBe("2023-01-02");
      expect(end).toBe("2023-01-08");
    });

    it("should handle last week of the year", () => {
      const [start, end] = trackingService.getStartEndDayByWeek(52, 2024);
      expect(end).toBe("2024-12-29");
    });
  });

  describe("getMyTrackingTime", () => {
    it("should group records by date", async () => {
      db.query.mockResolvedValue({
        rows: [
          { id: 1, date: new Date("2024-01-01"), reservedhours: 4, description: "work 1" },
          { id: 2, date: new Date("2024-01-01"), reservedhours: 2, description: "work 2" },
          { id: 3, date: new Date("2024-01-02"), reservedhours: 6, description: "work 3" },
        ],
      });

      const result = await trackingService.getMyTrackingTime(1, 2024, 1);

      expect(result).toHaveLength(2);

      const day1 = result.find((d) => d.date === "2024-01-01");
      expect(day1).toBeDefined();
      expect(day1.data).toHaveLength(2);

      const day2 = result.find((d) => d.date === "2024-01-02");
      expect(day2).toBeDefined();
      expect(day2.data).toHaveLength(1);
    });

    it("should return empty array when no records", async () => {
      db.query.mockResolvedValue({ rows: [] });

      const result = await trackingService.getMyTrackingTime(10, 2024, 1);
      expect(result).toEqual([]);
    });

    it("should call db.query with correct params", async () => {
      db.query.mockResolvedValue({ rows: [] });

      await trackingService.getMyTrackingTime(3, 2024, 42);

      expect(db.query).toHaveBeenCalledTimes(1);
      expect(db.query).toHaveBeenCalledWith(
        expect.any(String),
        ["2024-01-15", "2024-01-21", 42]
      );
    });

    it("should handle Date objects from db with timezone offset", async () => {
      const dateFromDb = new Date("2024-06-01T00:00:00.000Z");
      db.query.mockResolvedValue({
        rows: [
          { id: 1, date: dateFromDb, reservedhours: 3, description: "test" },
        ],
      });

      const result = await trackingService.getMyTrackingTime(22, 2024, 1);
      expect(result[0].date).toBe("2024-06-01");
    });

    it("should skip records with null date", async () => {
      db.query.mockResolvedValue({
        rows: [
          { id: 1, date: null, reservedhours: 3, description: "bad" },
          { id: 2, date: new Date("2024-01-01"), reservedhours: 5, description: "good" },
        ],
      });

      const result = await trackingService.getMyTrackingTime(1, 2024, 1);
      expect(result).toHaveLength(1);
      expect(result[0].data).toHaveLength(1);
    });
  });

  describe("setNewTrack", () => {
    const mockDbRow = (overrides = {}) => ({
      id: 1,
      user_id: 1,
      board_id: 11,
      date: new Date("2024-05-29"),
      description: "test work",
      reservedhours: 4,
      ...overrides,
    });

    it("should create a new tracking record", async () => {
      db.query.mockResolvedValue({ rows: [mockDbRow()] });

      const result = await trackingService.setNewTrack("2024-05-29", "test work", 4, 1);

      expect(result).toBeDefined();
      expect(result.id).toBe(1);
      expect(result.description).toBe("test work");
      expect(result.reservedhours).toBe(4);
    });

    it("should call db.query with board_id = 11", async () => {
      db.query.mockResolvedValue({ rows: [mockDbRow()] });

      await trackingService.setNewTrack("2024-05-29", "work", 5, 1);

      expect(db.query).toHaveBeenCalledWith(
        expect.any(String),
        [1, 11, "2024-05-29", "work", 5]
      );
    });

    it("should throw error when db returns no rows", async () => {
      db.query.mockResolvedValue({ rows: [] });

      await expect(
        trackingService.setNewTrack("2024-05-29", "work", 5, 1)
      ).rejects.toThrow("Fail add new track");
    });

    it("should throw error when id is missing", async () => {
      db.query.mockResolvedValue({ rows: [{ ...mockDbRow(), id: undefined }] });

      await expect(
        trackingService.setNewTrack("2024-05-29", "work", 5, 1)
      ).rejects.toThrow("Fail add new track");
    });

    it("should format the date before inserting", async () => {
      db.query.mockResolvedValue({ rows: [mockDbRow()] });

      const dateObj = new Date("2024-12-01");
      await trackingService.setNewTrack(dateObj, "work", 3, 1);

      expect(db.query).toHaveBeenCalledWith(
        expect.any(String),
        [1, 11, "2024-12-01", "work", 3]
      );
    });
  });
});
