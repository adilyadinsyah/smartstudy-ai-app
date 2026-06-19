const path = require('path');
const DatabaseUtils = require('../config/database');

const materiFilePath = path.join(__dirname, '../data/materi.json');

class MateriModel {
    static async findAnswerByQuery(userQuery) {
        const daftarMateri = await DatabaseUtils.readJsonFile(materiFilePath);
        const cleanedQuery = userQuery.toLowerCase().trim();

        for (const materi of daftarMateri) {
            const matchFound = materi.keywords.some(keyword => 
                cleanedQuery.includes(keyword.toLowerCase())
            );
            
            if (matchFound) {
                return materi.answer;
            }
        }
        return null;
    }
}

module.exports = MateriModel;