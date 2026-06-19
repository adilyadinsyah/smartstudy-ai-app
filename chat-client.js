document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');

    // 1. Ambil riwayat obrolan nyata dari database backend saat halaman dibuka
    async function loadChatHistory() {
        try {
            const response = await fetch('/api/chat/history');
            if (response.ok) {
                const history = await response.json();
                history.forEach(chat => {
                    appendMessage(chat.pertanyaan, 'user');
                    appendMessage(chat.jawaban, 'ai');
                });
            }
        } catch (error) {
            console.error('Gagal memuat riwayat chat backend:', error);
        }
    }

    // 2. Fungsi membuat balon chat baru di layar
    function appendMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);

        const now = new Date();
        const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

        messageDiv.innerHTML = `
            <div class="msg-bubble">
                ${text}
                <span class="msg-time">${timeStr}</span>
            </div>
        `;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll ke bawah
    }

    // 3. Fungsi membuat animasi titik tiga mengetik
    function showTypingIndicator() {
        const indicatorDiv = document.createElement('div');
        indicatorDiv.classList.add('message', 'ai');
        indicatorDiv.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        return indicatorDiv;
    }

    // 4. Logika ketika tombol kirim diklik
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const query = userInput.value.trim();
        if (!query) return;

        // Tampilkan pesan user ke layar sebelah kanan
        appendMessage(query, 'user');
        userInput.value = '';

        // Tampilkan indikator AI sedang mengetik
        const typingElem = showTypingIndicator();
        chatBox.appendChild(typingElem);
        chatBox.scrollTop = chatBox.scrollHeight;

        try {
            // KIRIM DATA KE BACKEND PORT 3000 (Bukan simulasi lagi!)
            const response = await fetch('/api/chat/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query: query })
            });

            const data = await response.json();

            // Beri sedikit delay visual (0.8 detik) agar animasi mengetik terlihat natural
            setTimeout(() => {
                typingElem.remove(); // Hapus animasi mengetik
                
                if (response.ok) {
                    appendMessage(data.jawaban, 'ai'); // Tampilkan jawaban asli dari materi.json
                } else {
                    appendMessage('Maaf, terjadi kesalahan pada sistem server.', 'ai');
                }
            }, 800);

        } catch (error) {
            console.error('Error:', error);
            typingElem.remove();
            appendMessage('Gagal terhubung ke server Node.js. Pastikan server aktif.', 'ai');
        }
    });

    // Jalankan fungsi riwayat chat di awal halaman terbuka
    loadChatHistory();
});