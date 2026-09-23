/* ================================================================
   ТЕСТЫ: проверка ответа на вопрос
   ================================================================ */
function checkAnswer(button, isCorrect) {
    const parent = button.parentElement;
    parent.querySelectorAll('.quiz-option').forEach(btn => {
        btn.classList.remove('correct', 'wrong');
        btn.disabled = true;
    });

    if (isCorrect) {
        button.classList.add('correct');
    } else {
        button.classList.add('wrong');
        parent.querySelectorAll('.quiz-option').forEach(btn => {
            if (btn.getAttribute('onclick').includes('true')) {
                btn.classList.add('correct');
            }
        });
    }
}

/* ================================================================
   ПОИСК ПО САЙТУ
   ================================================================
   Живой фильтр по ключевым словам. Работает без сервера.
   Поддерживает поиск технических терминов и латиницей, и кириллицей
   (CC08 = СС08, U2U = U2U, DPD = ДПД).
   ================================================================ */

const searchIndex = [
    // ===== Раздел 1: Как читать карточку =====
    { title: "Как читать карточку", page: "tz.html", anchor: "#sec-1", keywords: "карточка чтение диалог звонок транскрипция голосовое изображение U2U пользователь" },

    // ===== Раздел 2.1: Организация сделки вне Авито =====
    { title: "ДОСТАВКА_ВНЕШНЯЯ", page: "tz.html", anchor: "#sec-2-1", keywords: "доставка внешняя ozon wildberries достависта яндекс луч энергия КИТ деловые линии курьер такси автобус маршрутка" },
    { title: "ДОСТАВКА_НАПРЯМУЮ", page: "tz.html", anchor: "#sec-2-1", keywords: "доставка напрямую сдэк почта россии яндекс маркет DPD ПЭК 5Post предоплата напрямую вне авито" },
    { title: "РЕКВИЗИТЫ_ВНЕ_АВИТО", page: "tz.html", anchor: "#sec-2-1", keywords: "реквизиты карта номер телефон перевод QR код ссылка платеж реквизиты вне авито" },

    // ===== Раздел 2.2: Подтверждение реализации =====
    { title: "ОПЛАТА_ВНЕ_АВИТО", page: "tz.html", anchor: "#sec-2-2", keywords: "оплата вне авито перевод чек квитанция скриншот деньги пришли постоплата оплата через авито" },
    { title: "ОТПРАВКА_ВНЕ_АВИТО", page: "tz.html", anchor: "#sec-2-2", keywords: "отправка вне авито физический товар передача самовывоз личная встреча трек накладная цифровой товар промокод ключ файл" },

    // ===== Раздел 2.3: Корнеры =====
    { title: "Упомянутые корнеры", page: "tz.html", anchor: "#sec-2-3", keywords: "упомянутые корнеры сигнал упоминание обсуждение корнер-кейс" },
    { title: "Реализованные корнеры", page: "tz.html", anchor: "#sec-2-3", keywords: "реализованные корнеры выполнение сделки оплата отправка реализованный корнер" },

    // ===== Раздел 2.4: Готовность продавца =====
    { title: "ГОТОВНОСТЬ_ПРОДАВЦА_ОТПРАВИТЬ_ВНЕ_АВИТО", page: "tz.html", anchor: "#sec-2-4", keywords: "готовность продавца отправить вне авито предложение согласие продавца" },

    // ===== Раздел 2.5: Итоговое решение =====
    { title: "ПОДТВЕРЖДЕННЫЙ АБЬЮЗ", page: "tz.html", anchor: "#sec-2-5", keywords: "подтвержденный абьюз итог решение формула организация реализация шаги абьюз" },
    { title: "Формула и шаги 1–4", page: "tz.html", anchor: "#sec-2-5", keywords: "формула шаг 1 шаг 2 шаг 3 шаг 4 проверка организация реализация корнер схема" },
    { title: "Возврат", page: "tz.html", anchor: "#sec-2-5", keywords: "возврат товара денег реквизиты возврат первоначальная покупка" },

    // ===== Раздел 3: Справочник корнеров =====
    { title: "CC01 — Курьер или такси", page: "tz.html", anchor: "#sec-3", keywords: "CC01 курьер такси водитель автобус маршрутка" },
    { title: "CC02 — Личная встреча", page: "tz.html", anchor: "#sec-3", keywords: "CC02 личная встреча передача товара" },
    { title: "CC03 — Самовывоз", page: "tz.html", anchor: "#sec-3", keywords: "CC03 самовывоз забирает покупатель" },
    { title: "CC04 — Недоступный регион", page: "tz.html", anchor: "#sec-3", keywords: "CC04 недоступный регион беларусь другая страна ПВЗ 15 км" },
    { title: "CC05 — КГТ", page: "tz.html", anchor: "#sec-3", keywords: "CC05 КГТ крупногабаритный плашка крупногабаритность" },
    { title: "CC06 — Электронный товар", page: "tz.html", anchor: "#sec-3", keywords: "CC06 электронный товар промокод ключ файл" },
    { title: "CC07 — Изготовление на заказ", page: "tz.html", anchor: "#sec-3", keywords: "CC07 изготовление на заказ" },
    { title: "CC08 — Закупка под клиента", page: "tz.html", anchor: "#sec-3", keywords: "CC08 закупка под клиента из-за рубежа" },
    { title: "CC09 — Услуга", page: "tz.html", anchor: "#sec-3", keywords: "CC09 услуга оказание услуги" },
    { title: "CC10 — Обмен", page: "tz.html", anchor: "#sec-3", keywords: "CC10 обмен доплата" },
    { title: "CC11 — Аренда", page: "tz.html", anchor: "#sec-3", keywords: "CC11 аренда временное пользование" },
    { title: "CC12 — Оплата брони", page: "tz.html", anchor: "#sec-3", keywords: "CC12 оплата брони задаток бронь" },
    { title: "CC13 — Расчетный счет", page: "tz.html", anchor: "#sec-3", keywords: "CC13 расчетный счет инициатива покупателя" },
    { title: "CC14 — Компенсация комиссии", page: "tz.html", anchor: "#sec-3", keywords: "CC14 компенсация комиссии авито занижение цены" },
    { title: "CC00 — Другое", page: "tz.html", anchor: "#sec-3", keywords: "CC00 другое сценарий" },

    // ===== Раздел 4: Несколько объявлений =====
    { title: "Несколько объявлений и покупок", page: "tz.html", anchor: "#sec-4", keywords: "несколько объявлений несколько покупок объединить материалы общий заказ U2U" },
    { title: "По каким объявлениям подтвержден увод?", page: "tz.html", anchor: "#sec-4", keywords: "объявления подтвержден увод выбор D01 D02 D03" },

    // ===== Страница Примеры (Раздел 5) =====
    { title: "5.1. Организация сделки", page: "examples.html", anchor: "#ex-5-1", keywords: "пример организация сделки доставка внешняя напрямую реквизиты готовность продавца ozon сдэк энергией" },
    { title: "5.2. Оплата и отправка", page: "examples.html", anchor: "#ex-5-2", keywords: "пример оплата отправка чек трек посылка самовывоз обещание перевести" },
    { title: "5.3. Корнеры и итоговое решение", page: "examples.html", anchor: "#ex-5-3", keywords: "пример корнеры итог бронь обмен возврат КГТ задаток самовывоз такси" },
    { title: "5.4. Несколько объявлений и покупок", page: "examples.html", anchor: "#ex-5-4", keywords: "пример несколько объявлений несколько покупок общий заказ часы ключница" },
    { title: "5.5. Примеры по изображениям", page: "examples.html", anchor: "#ex-5-5", keywords: "пример изображение QR квитанция скриншот оплата через авито трек оформлено" },

    // ===== Частые ошибки (страница errors.html) =====
    { title: "Ошибка 1: Личная встреча ≠ самовывоз", page: "errors.html", anchor: "#error-1", keywords: "ошибка личная встреча самовывоз корнер CC03 СС03 реализованный" },
    { title: "Ошибка 2: Самовывоз без ответа продавца", page: "errors.html", anchor: "#error-2", keywords: "ошибка самовывоз упомянутый корнер CC03 СС03 без ответа продавца" },
    { title: "Ошибка 3: КГТ у стола, обсуждают картины", page: "errors.html", anchor: "#error-3", keywords: "ошибка КГТ стол картины плашка CC05 СС05 резолюции нет" },
    { title: "Ошибка 4: Самовывоз — инициатива покупателя", page: "errors.html", anchor: "#error-4", keywords: "ошибка самовывоз инициатива покупателя корнер CC03 СС03" },
    { title: "Ошибка 5: Один заказ из двух объявлений", page: "errors.html", anchor: "#error-5", keywords: "ошибка один заказ два объявления несколько покупок абьюз увод реквизиты оплата" },

    // ===== Тесты =====
    { title: "Тренировочные тесты", page: "tests.html", anchor: "", keywords: "тест тесты проверка знаний U2U" }
];/* ---------- Нормализация латиницы ↔ кириллицы ----------
   Позволяет искать CC08 и СС08 (кириллицей), DPD и ДПД,
   U2U и U2U (в обоих алфавитах) и т.д.
   Применяется ТОЛЬКО к коротким строкам, чтобы не портить
   обычные русские слова (например, «срок»).
---------------------------------------------------------- */
const CYR_TO_LAT_MAP = {
    'с': 'c', 'а': 'a', 'е': 'e', 'о': 'o', 'р': 'p',
    'х': 'x', 'у': 'y', 'к': 'k', 'в': 'b', 'н': 'h',
    'м': 'm', 'т': 't'
};

function normalizeShort(str) {
    return str.replace(/[саеорхуквнмт]/g, ch => CYR_TO_LAT_MAP[ch] || ch);
}

/* Приводит строку к виду, пригодному для сравнения:
   - нижний регистр
   - убирает лишние пробелы
   - для коротких строк (≤ 6 символов) нормализует кириллицу */
function makeSearchString(str) {
    const cleaned = str.toLowerCase().trim().replace(/\s+/g, ' ');
    if (cleaned.length <= 6) {
        return normalizeShort(cleaned);
    }
    return cleaned;
}

function initSearch() {
    const input = document.getElementById('site-search');
    const results = document.getElementById('search-results');
    if (!input || !results) return;

    // Заранее готовим нормализованные ключи для всех элементов индекса
    const preparedIndex = searchIndex.map(item => ({
        ...item,
        _titleNorm: makeSearchString(item.title),
        _keywordsNorm: makeSearchString(item.keywords)
    }));

    input.addEventListener('input', () => {
        const raw = input.value.trim();
        const q = makeSearchString(raw);

        results.innerHTML = '';

        if (q.length < 2) {
            results.classList.remove('visible');
            return;
        }

        const found = preparedIndex.filter(item =>
            item._titleNorm.includes(q) || item._keywordsNorm.includes(q)
        ).slice(0, 10);

        if (found.length === 0) {
            results.classList.add('visible');
            results.innerHTML = '<li class="search-empty">Ничего не найдено. Попробуйте другой запрос.</li>';
            return;
        }

        results.classList.add('visible');
        found.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.page + item.anchor;
            a.textContent = item.title;
            li.appendChild(a);
            results.appendChild(li);
        });
    });

    // Скрываем результаты при клике мимо
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box')) {
            results.classList.remove('visible');
        }
    });

    // Показать снова при фокусе, если есть ввод
    input.addEventListener('focus', () => {
        if (input.value.trim().length >= 2 && results.children.length > 0) {
            results.classList.add('visible');
        }
    });
}

document.addEventListener('DOMContentLoaded', initSearch);/* ================================================================
   ТЕСТЫ: интерактивная логика со счётчиком и разбором
   ================================================================
   Работает для tests.html. Активна только если на странице есть
   элементы с классом .quiz и id="quiz-progress".
   ================================================================ */

const QUIZ_TOTAL = 10;

/* Храним ответы пользователя по каждому вопросу */
const quizState = {
    answers: {}, // { вопросIndex: { chosenText, isCorrect, correctText, note } }
    total: 0,
    right: 0
};

function initQuiz() {
    const progress = document.getElementById('quiz-progress');
    if (!progress) return; // на этой странице тестов нет

    // Обход всех вопросов
    const quizzes = document.querySelectorAll('.quiz');

    quizzes.forEach((quiz, index) => {
        const buttons = quiz.querySelectorAll('.quiz-option');
        const noteEl = quiz.querySelector('.quiz-review-note');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // если уже отвечено — ничего не делаем
                if (quiz.dataset.answered === 'true') return;

                const isCorrect = btn.dataset.correct === 'true';
                const chosenText = btn.textContent.trim();

                // найти правильный вариант
                let correctText = '';
                let note = '';
                buttons.forEach(b => {
                    if (b.dataset.correct === 'true') {
                        correctText = b.textContent.trim();
                    }
                });
                if (noteEl) note = noteEl.textContent.trim();

                // подсветить всё
                buttons.forEach(b => {
                    b.disabled = true;
                    if (b.dataset.correct === 'true') {
                        b.classList.add('correct');
                    }
                });

                if (isCorrect) {
                    btn.classList.add('chosen-right');
                    quizState.right++;
                } else {
                    btn.classList.add('chosen-wrong');
                }

                // запомнить ответ
                quizState.answers[index] = {
                    chosenText,
                    isCorrect,
                    correctText,
                    note
                };
                quiz.dataset.answered = 'true';
                quizState.total++;

                updateProgress();
            });
        });
    });

    // Сброс
    const resetBtn = document.getElementById('quiz-reset');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetQuiz);
    }
}

function updateProgress() {
    const counter = document.getElementById('quiz-counter');
    if (counter) {
        counter.textContent = quizState.right;
    }

    const totalEl = document.getElementById('quiz-answered');
    if (totalEl) {
        totalEl.textContent = quizState.total;
    }

    // Если ответили на все — показать финал
    if (quizState.total === QUIZ_TOTAL) {
        showFinalReview();
    }
}

function showFinalReview() {
    const container = document.getElementById('quiz-review');
    if (!container) return;

    let html = '';
    html += '<div class="quiz-final">';
    html += '<h2>🏁 Тест завершён</h2>';
    html += '<p class="quiz-final-score">Правильно: <strong>' + quizState.right + ' из ' + QUIZ_TOTAL + '</strong></p>';

    let verdict = '';
    if (quizState.right === QUIZ_TOTAL) {
        verdict = 'Идеально! Все ответы верны — вы готовы к разметке. 🎉';
    } else if (quizState.right >= 8) {
        verdict = 'Отличный результат. Перечитайте разбор ошибок ниже — и в путь.';
    } else if (quizState.right >= 6) {
        verdict = 'Хороший результат, но стоит перечитать ТЗ и примеры по темам, где были ошибки.';
    } else {
        verdict = 'Рекомендуем вернуться к ТЗ и примерам — материал стоит повторить.';
    }
    html += '<p class="quiz-final-verdict">' + verdict + '</p>';
    html += '</div>';

    html += '<h2 style="font-family: \'Playfair Display\', Georgia, serif; font-size: 22px; color: #4a2c14; margin: 24px 0 12px;">Разбор ответов</h2>';

    // Пробегаем по всем вопросам по порядку
    document.querySelectorAll('.quiz').forEach((quiz, index) => {
        const titleEl = quiz.querySelector('h3');
        const title = titleEl ? titleEl.textContent.trim() : ('Вопрос ' + (index + 1));
        const ans = quizState.answers[index];

        if (!ans) return;

        html += '<div class="quiz-review">';
        html += '<h3>' + title + '</h3>';
        html += '<p class="quiz-review-row"><span class="quiz-review-label">Ваш ответ: </span>' +
                (ans.isCorrect ? '<span class="quiz-review-right">' + escapeHtml(ans.chosenText) + ' ✓</span>' :
                                 '<span class="quiz-review-wrong">' + escapeHtml(ans.chosenText) + ' ✗</span>') +
                '</p>';

        if (!ans.isCorrect) {
            html += '<p class="quiz-review-row"><span class="quiz-review-label">Правильный ответ: </span>' +
                    '<span class="quiz-review-right">' + escapeHtml(ans.correctText) + '</span></p>';
        }

        if (ans.note) {
            html += '<div class="quiz-review-note">' + escapeHtml(ans.note) + '</div>';
        }

        html += '</div>';
    });

    container.innerHTML = html;
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetQuiz() {
    // Сбросить состояние
    quizState.answers = {};
    quizState.total = 0;
    quizState.right = 0;

    // Обход вопросов — снять подсветку
    document.querySelectorAll('.quiz').forEach(quiz => {
        quiz.dataset.answered = 'false';
        quiz.querySelectorAll('.quiz-option').forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('correct', 'wrong', 'chosen-right', 'chosen-wrong');
        });
    });

    // Очистить финальный блок
    const review = document.getElementById('quiz-review');
    if (review) review.innerHTML = '';

    updateProgress();
}

/* Простая защита от XSS при выводе текста */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', initQuiz);
