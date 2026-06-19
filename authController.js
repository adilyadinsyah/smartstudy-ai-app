class AuthController {
    static loginProcess(req, res) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Username dan password tidak boleh kosong!" 
            });
        }

        // Akun dummy keras sesuai requirement flowchart
        if (username === "admin" && password === "admin123") {
            return res.status(200).json({ 
                success: true, 
                message: "Login berhasil!" 
            });
        } else {
            return res.status(401).json({ 
                success: false, 
                message: "Username atau password salah! Silakan coba lagi." 
            });
        }
    }
}

module.exports = AuthController;