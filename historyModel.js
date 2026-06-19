const fs = require('fs').promises;
const path = require('path');
const DatabaseUtils = require('../config/database');

const historyFilePath = path.join(__dirname, '../data/history.json');

class HistoryModel {
    static async saveChat(question, answer) {
        const currentHistory = await DatabaseUtils.readJsonFile(historyFilePath);
        
        const newLog = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            question: question,
            answer: answer
        };
        
        currentHistory.push(newLog);
        await DatabaseUtils.writeJsonFile(historyFilePath, currentHistory);
        return newLog;
    }

    static async getAllHistory() {
        return await DatabaseUtils.readJsonFile(historyFilePath);
    }
}

module.exports = HistoryModel;