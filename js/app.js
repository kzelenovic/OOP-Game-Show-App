/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;
const mainButton = document.querySelector('#btn__reset');
const phrase = document.querySelector('#phrase').firstElementChild;
const letters = document.getElementsByClassName("key");
const hearts = document.querySelector('#scoreboard').firstElementChild.children;

/**
 * Starts game and also resets the app after a gameover
 */
mainButton.addEventListener('click', () => {
    game = new Game();
    phrase.replaceChildren('');

    for (const letter of letters) {
        letter.disabled = false;
        letter.className = 'key';
    }

    for (const heart of hearts) {
        heart.innerHTML = `<li class="tries"><img src="images/liveHeart.png" alt="Heart Icon" height="35" width="30"></li>`;
    }

    game.startGame();
});

/**
 * blurs after click because keydown event does not trigger
 * after a letter is disabled from a click
 */
for (const letter of letters) {
    letter.addEventListener('click', (e) => {
        game.handleInteraction(e.target);
        document.activeElement.blur();
    });
}

/**
 * matches key with button if it not already disabled
 * checking for enabled/disabled prevents key from being spammed and running out of lives
 */
document.addEventListener('keydown', (e) => {
    for (const letter of letters) {
        if (!letter.disabled) {
            if (letter.innerText === e.key) {
                game.handleInteraction(letter);
            }
        }
    }
});