const db = require('../config/sqlite'); 

/**
 * Finds campaigns associated with a specific fundraiser ID (123) and orders them by amount.
 * * Corresponds to: 
 * SELECT id, title, fundraiser_id, amounts FROM campaigns WHERE fundraiser_id = 123 ORDER BY amounts DESC
 * * @returns {Array} An array of campaign objects.
 */
exports.findByFundraiser123AndOrder = () => {
    // The specific query requested, using a constant value (123) and correct table/column names.
    const sql = `
        SELECT 
            id,  
            title, 
            fundraiser_id, 
            amounts 
        FROM 
            campaigns 
        WHERE 
            fundraiser_id = 123 
        ORDER BY 
            amounts DESC
    `;
    
    try {
        // .all() retrieves all resulting rows. No parameters are needed here since 123 is hardcoded.
        const campaigns = db.prepare(sql).all();
        return campaigns;
    } catch (error) {
        console.error("Error finding campaigns:", error.message);
        throw error;
    }
};

// If you still need a generic findAll (from the original request, but updated for SQLite)
exports.findAll = (fundraiserId) => {
    const sql = `
        SELECT id, title, fundraiser_id, amounts 
        FROM campaigns 
        WHERE fundraiser_id = ? 
        ORDER BY amounts DESC
    `;
    
    try {
        // Use a parameter for a generic function
        return db.prepare(sql).all(fundraiserId);
    } catch (error) {
        console.error("Error finding campaigns by ID:", error.message);
        throw error;
    }
};