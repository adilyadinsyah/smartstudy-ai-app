document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Menahan agar halaman tidak refresh kosong

            const usernameInput = document.getElementById('username').value;
            const passwordInput = document.getElementById('password').value;
            const errorBox = document.getElementById('error-message');

            // Sembunyikan error lama jika ada
            if (errorBox) {
                errorBox.classList.add('hidden');
                errorBox.innerText = '';
            }

            try {
                // Mengirim data ke server Express port 3000
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: usernameInput,
                        password: passwordInput
                    })
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    // JIKA BERHASIL: Browser diperintahkan pindah ke halaman /dashboard
                    window.location.href = '/dashboard';
                } else {
                    // JIKA GAGAL: Tampilkan teks merah
                    if (errorBox) {
                        errorBox.innerText = data.message || 'Username atau password salah!';
                        errorBox.classList.remove('hidden');
                    } else {
                        alert(data.message || 'Username atau password salah!');
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Gagal terhubung ke server. Pastikan terminal VS Code sudah menjalankan "node server.js".');
            }
        });
    }
});