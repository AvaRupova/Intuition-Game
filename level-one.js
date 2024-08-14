window.addEventListener('load', function () {
    // Ensure that window.intuitionGame is defined
    window.intuitionGame = window.intuitionGame || {};

    (function (intuitionGame) {

        const resultElement = document.getElementById('result');
        const optionOneElement = document.getElementById('optionOne');
        const optionTwoElement = document.getElementById('optionTwo');
        const attemptSuccessCountElement = document.getElementById('attemptSuccessCount');
        const attemptCurrentCountElement = document.getElementById('attemptCurrentCount');
        const attemptLimitCountElements = document.getElementsByClassName('attempt-limit-count');

        const colors = {
            white: 'white',
            green: 'green',
            red: 'red'
        };
        const attemptSuccessCount = 3;
        const attemptLimitCount = 5;

        // in this way you can expose the variable outside the function, otherwise it would be not visible
        intuitionGame.attemptCurrentCount = 1;

        let intervalId;
        let optionNumber = -1;
        let colorWinner;

        const checkOptionOneWinner = () => optionNumber < 5;

        const increaseCurrentCounter = () => {
            intuitionGame.attemptCurrentCount += 1;
            attemptCurrentCountElement.innerText = intuitionGame.attemptCurrentCount;
        };

        const getRandomColor = () => {
            const letters = '0123456789ABCDEF'
            let regularColor = '#'

            for (let i = 0; i < 6; i++) {
                regularColor += letters[Math.floor(Math.random() * 16)]
            }
            return regularColor
        };

        const startChangingColors = () => {
            stopChangingColors();
            intervalId = setInterval(() => {
                resultElement.style.backgroundColor = getRandomColor();
            }, 100);
        };

        const stopChangingColors = () => {
            clearInterval(intervalId);
        };

        const getRandomNumber = () => Math.random() * 10;

        const setOptionNumber = () => optionNumber = getRandomNumber();

        const setOptionColors = () => {
            optionNumber = getRandomNumber();
            colorWinner = getRandomColor();

            optionOneElement.style.backgroundColor = checkOptionOneWinner() ? colorWinner : getRandomColor();
            optionTwoElement.style.backgroundColor = checkOptionOneWinner() ? getRandomColor() : colorWinner;
        };

        const setResultColors = () => {
            optionOneElement.style.borderColor = checkOptionOneWinner() ? colors.green : colors.red;
            optionTwoElement.style.borderColor = checkOptionOneWinner() ? colors.red : colors.green;
            resultElement.style.backgroundColor = colorWinner;
        };

        const resetBorderColors = () => {
            optionOneElement.style.borderColor = colors.white;
            optionTwoElement.style.borderColor = colors.white;
        };

        const restartAttempt = () => {
            if (intuitionGame.attemptCurrentCount >= attemptLimitCount) {
                return;
            }
            setResultColors();

            setTimeout(() => {
                increaseCurrentCounter();
                resetBorderColors();
                startChangingColors();
                setOptionColors();
            }, 2000);
        };

        const attachClickEventHandlers = (element) => {
            element.addEventListener('click', () => {
                restartAttempt();
                stopChangingColors();
            });
        };

        const setElementsText = () => {
            attemptSuccessCountElement.innerText = attemptSuccessCount;
            attemptCurrentCountElement.innerText = intuitionGame.attemptCurrentCount;
            Array.from(attemptLimitCountElements).forEach(element => {
                element.innerText = attemptLimitCount;
            });
        };

        const applicationStart = () => {
            attachClickEventHandlers(optionOneElement);
            attachClickEventHandlers(optionTwoElement);
            startChangingColors();
            setOptionColors();
            setElementsText();
        };

        applicationStart();

    })(window.intuitionGame);
});

window.addEventListener('pageshow', function () {
    const game = window.intuitionGame;
    console.log( game.attemptCurrentCount); // 1
    console.log( game.attemptSuccessCount); // undefined as not exposed
});


// repeated code
// useless comments
// typos
