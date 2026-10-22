/* ================================================================
   ЗАЩИТА ПАРОЛЕМ (sessionStorage)
   ================================================================ */
(function initAuth() {
    const CORRECT_PASSWORD = '10Vfyefk444'; 
    const STORAGE_KEY = '10444_auth';

    // Если уже авторизован в этой вкладке — ничего не делаем
    if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
        return;
    }

    // Скрываем контент до ввода пароля, чтобы не мелькал
    document.documentElement.style.visibility = 'hidden';

    // Ждем загрузки DOM для отрисовки формы
    document.addEventListener('DOMContentLoaded', () => {
        document.documentElement.style.visibility = 'visible';

        const overlay = document.createElement('div');
        overlay.className = 'auth-overlay';
        overlay.innerHTML = `
            <div class="auth-card">
                <h2>🔒 Мануал проекта. Введите пароль для доступа</h2>
                <p class="auth-hint">Если у вас нет пароля — напишите руководителю</p>
                
                <input type="password" id="auth-password" class="auth-input" placeholder="Пароль">
                <button id="auth-submit" class="auth-btn">Войти</button>
                <p id="auth-error" class="auth-error">Неверный пароль. Попробуйте ещё раз.</p>
            </div>
        `;

        document.body.appendChild(overlay);

        const input = document.getElementById('auth-password');
        const btn = document.getElementById('auth-submit');
        const errorMsg = document.getElementById('auth-error');

        input.focus();

        function checkPassword() {
            if (input.value === CORRECT_PASSWORD) {
                sessionStorage.setItem(STORAGE_KEY, 'true');
                overlay.remove();
            } else {
                errorMsg.style.display = 'block';
                input.value = '';
                input.focus();
                
                const card = overlay.querySelector('.auth-card');
                card.style.transform = 'translateX(6px)';
                setTimeout(() => card.style.transform = 'translateX(-6px)', 60);
                setTimeout(() => card.style.transform = 'translateX(6px)', 120);
                setTimeout(() => card.style.transform = 'translateX(0)', 180);
            }
        }

        btn.addEventListener('click', checkPassword);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkPassword();
        });
    });
})();
