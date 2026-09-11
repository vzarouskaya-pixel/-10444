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
