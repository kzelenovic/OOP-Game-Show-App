/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    };

    /**
     * Display phrase on game board
     */
    addPhraseToDisplay() {
        let ul = document.querySelector('#phrase').firstElementChild;
        const characters = this.phrase.split('');

        characters.forEach((character) => {
            let li = document.createElement('li');
            if (character === ' ') {
                li.innerText = ' ';
                li.className = 'space';
                ul.appendChild(li);
            } else {
                li.innerText = `${character}`;
                li.classList = `hide letter ${character}`;
                ul.appendChild(li);
            }
        });
    };

    /**
     * Checks if passed letter is in phrase
     * @param (string) letter - Letter to check
     */
    checkLetter(letter) {
        let characters = game.activePhrase.phrase.split('');

        return (characters.includes(letter))
    };

    /**
     * Displays passed letter on screen after a match is found
     * @param (string) letter - Letter to display
     */
    showMatchedLetter(letter) {
        let lis = document.querySelector('#phrase').firstElementChild.children;

        for (let i = 0; i < lis.length; i++) {
            const li = lis[i];
            if (li.classList.contains(letter)) {
                li.classList = `show letter ${letter}`;
            }
        }
    };
}