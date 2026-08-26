
const TRACKING_QUERY = {
    getTrackByUserId:
        `SELECT * 
         FROM tracking
         WHERE date BETWEEN $1 AND $2
         AND user_id = $3;
        `,

    addNewTrack:
        `INSERT INTO tracking
         (user_id, board_id, date, description, reservedhours) 
         values ($1, $2, $3, $4, $5) RETURNING * 
        `
}

module.exports = TRACKING_QUERY;