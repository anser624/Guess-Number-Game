document.addEventListener('DOMContentLoaded', () => {
    const maxLives = 5;
    let lives = maxLives;
    const secretNumber = Math.floor(Math.random() * 10) + 1;
    
    const livesDisplay = document.getElementById('lives');
    const messageDisplay = document.getElementById('message');
    const guessInput = document.getElementById('guess-input');
    const guessButton = document.getElementById('guess-button');
    const restartButton = document.getElementById('restart-button');
    
    updateLivesDisplay();

    guessButton.addEventListener('click', () => {
        const guess = parseInt(guessInput.value);
        if (isNaN(guess) || guess < 1 || guess > 10) {
            setMessage('Please enter a number between 1 and 10.');
            return;
        }

        if (guess === secretNumber) {
            setMessage('🎉 You guessed it right! You win!');
            endGame(true);
        } else {
            lives--;
            if (lives === 0) {
                setMessage(`😞 Game Over! The number was ${secretNumber}.`);
                endGame(false);
            } else {
                setMessage(`Wrong guess! ${guess < secretNumber ? 'Try higher.' : 'Try lower.'}`);
                updateLivesDisplay();
            }
        }
    });

    restartButton.addEventListener('click', () => {
        lives = maxLives;
        updateLivesDisplay();
        setMessage('');
        guessInput.value = '';
        guessInput.disabled = false;
        guessButton.disabled = false;
        restartButton.classList.add('hidden');
    });

    function updateLivesDisplay() {
        livesDisplay.textContent = ''.repeat(lives);
    }

    function setMessage(message) {
        messageDisplay.textContent = message;
    }

    function endGame(won) {
        guessInput.disabled = true;
        guessButton.disabled = true;
        restartButton.classList.remove('hidden');
    }
});