const MateriModel = require('../models/materiModel');
const HistoryModel = require('../models/historyModel');

class ChatController {
    static async askQuestion(req, res) {
        try {
            const { question } = req.body;

            if (!question || question.trim() === "") {
                return res.status(400).json({ 
                    success: false, 
                    message: "Pertanyaan tidak boleh kosong!" 
                });
            }

            const answer = await MateriModel.findAnswerByQuery(question);

            if (answer) {
                await HistoryModel.saveChat(question, answer);
                return res.status(200).json({ 
                    success: true, 
                    answer: answer 
                });
            } else {
                const defaultFallbackAnswer = "Maaf, materi belum tersedia";
                await HistoryModel.saveChat(question, defaultFallbackAnswer);
                return res.status(200).json({ 
                    success: true, 
                    answer: defaultFallbackAnswer 
                });
            }
        } catch (error) {
            return res.status(500).json({ 
                success: false, 
                message: "Terjadi kesalahan pada sistem internal server." 
            });
        }
    }

    static async getChatHistory(req, res) {
        try {
            const history = await HistoryModel.getAllHistory();
            return res.status(200).json({ 
                success: true, 
                history: history 
            });
        } catch (error) {
            return res.status(500).json({ 
                success: false, 
                message: "Gagal mengambil data riwayat." 
            });
        }
    }
}

module.exports = ChatController;