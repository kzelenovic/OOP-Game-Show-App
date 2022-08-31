/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [
            new Phrase(`better late than never`),
            new Phrase(`speak of the devil`),
            new Phrase(`once in a blue moon`),
            new Phrase(`no pain no gain`),
            new Phrase(`when pigs fly`)
        ];
        this.activePhrase = null;
    };

    /**
     * Begins game by selecting a random phrase and displaying it to user
     */
    startGame() {
        document.querySelector('#overlay').style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    };

    /**
     * Selects random phrase from phrases property
     * @return {Object} Phrase object chosen to be used
     */
    getRandomPhrase() {
        const randomNum = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomNum];
    };

    /**
     * Handles onscreen keyboard button clicks
     * @param (HTMLButtonElement) button - The clicked button element
     */
    handleInteraction(button) {
        let letter = button.innerText;
        button.disabled = true;
        if (this.activePhrase.checkLetter(letter)) {
            button.classList.add('chosen');
            this.activePhrase.showMatchedLetter(letter);
            if(this.checkForWin()) {
                this.gameOver(true);
            }
        } else {
            button.classList.add('wrong');
            this.removeLife();
        }
    };

    /**
     * Checks for winning move
     * @return {boolean} True if game has been won, false if game wasn't won
     */
    checkForWin() {
        let letters = document.querySelector('#phrase').firstElementChild.children;
        let hiddenLetters = [];
        for (const letter of letters) {
            if(letter.classList.contains('hide')){
                hiddenLetters.push(letter);
            }
        }
        
        if (hiddenLetters.length > 0) {
            return false;
        } else {
            return true;
        }
    };

    /**
     * Increases the value of the missed property
     * Removes a life from the scoreboard
     * Checks if player has remaining lives and ends game if player is out
     */
    removeLife() {
        const hearts = document.querySelector('#scoreboard').firstElementChild.children;
        for (let i = 0; i < hearts.length; i++) {
            const heart = hearts[this.missed];
            heart.innerHTML = `<li class="tries"><img src="images/lostHeart.png" alt="Heart Icon" height="35" width="30"></li>`;
        }

        this.missed++;

        if (this.missed >= 5) {
            this.gameOver(false);
        }
    };

    /**
     * Displays game over message
     * @param {boolean} gameWon - Whether or not the user won the game
     */
    gameOver(gameWon) {
        const overlay = document.querySelector('#overlay');
        let message = document.querySelector('#game-over-message');

        overlay.style.display = 'flex';

        if (gameWon) {
            overlay.className = 'win';
            message.innerHTML = `Congrats! You won!
            <br>
            Try Again?`
        }
        if (!gameWon) {
            overlay.className = 'lose';
            message.innerHTML = `Woopsi! You ran out of tries.
            <br>
            Try Again?`;
        }
    };
}