const fs = require('fs').promises;
const path = require('path');

class DatabaseUtils {
    static async readJsonFile(filePath) {
        try {
            const data = await fs.readFile(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            }
            throw error;
        }
    }

    static async writeJsonFile(filePath, data) {
        try {
            const jsonString = JSON.stringify(data, null, 2);
            await fs.writeFile(filePath, jsonString, 'utf8');
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DatabaseUtils;