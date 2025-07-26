
//===== THEME BUTTON CLICK AND CHANGE =====//
const sun = document.getElementById("sun")
const moon = document.getElementById("moon")

if (sun) {
    sun.addEventListener('click', () => {
        sun.classList.remove('selected');
        moon.classList.add('selected');
        sun.classList.add('unselected');
        moon.classList.remove('unselected');
    })
}
if (moon) {
    moon.addEventListener('click', () => {
        moon.classList.remove('selected');
        sun.classList.add('selected');
        moon.classList.add('unselected');
        sun.classList.remove('unselected');
    })
}

const toggleButton = document.getElementById("toggle");
const closeButton = document.getElementById("close");
const navList = document.getElementById("nav-list");
const themeSelector = document.getElementById("theme-selector");
const calculatorContainer = document.getElementById("calculator-container");
if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        navList.classList.add("list_show");
        toggleButton.classList.add("hide_toggle_btn");
        closeButton.classList.add("close_btn_show")
        themeSelector.classList.add("themeshow")
        calculatorContainer.classList.add("calculator__container_hiden")
    });
}
if (closeButton) {
    closeButton.addEventListener('click', () => {
        closeEverything();
    });
}

function closeEverything() {
    navList.classList.remove("list_show");
    closeButton.classList.remove("close_btn_show")
    themeSelector.classList.remove("themeshow")
    calculatorContainer.classList.remove("calculator__container_hiden")
    toggleButton.classList.remove("hide_toggle_btn");


}

//===== CALCULATOR SELECTOR =====//

const nav__list = document.querySelectorAll(".nav__link")

nav__list.forEach(nav__link => {
    nav__link.addEventListener('click', () => {
        nav__list.forEach(e => {
            e.classList.remove("visited");
            e.classList.remove("active");
        })
        nav__link.classList.add("visited");
        void nav__link.offsetWidth;
        nav__link.classList.add("active");
        closeEverything();
    })
});


//===== STANDARD CALCULATOR =====//
const calculator = {
    hello() {
        console.log("hi");
    },
    expression: '',
    storeExpression: '',
    resultShown: false,

    elements: {
        expression: document.getElementById("calculator-expression"),
        result: document.getElementById("calculator-result"),
        keypad: document.getElementById("standard__keypad")
    },

    init() {
        this.setupEventListener();
    },

    handleButtonClick(button) {
        const action = button.dataset.action;
        const value = button.dataset.value;

        if (this.resultShown) {
            if (action === 'operator') {
                this.expression = this.elements.result.value;
                this.resultShown = false;
            }
            else if (action !== 'clear' && action !== 'backspace' && action !== 'calculate') {
                this.clearDisplay();
                this.resultShown = false;
            }
        }

        switch (action) {
            case 'number':
            case 'decimal':
            case 'operator':
                this.appendToExpression(value);
                break;
            case 'clear':
                this.clearDisplay();
                break;
            case 'backspace':
                this.backspace();
                break;
            case 'calculate':
                this.calculateResult();
                break;
        }

    },

    appendToExpression(value) {
        if (value === '.' && /\.\d*$/.test(this.expression)) {
            return;
        }

        if (['+', '-', '*', '/', '%'].includes(value)) {
            const lastChar = this.expression.slice(-1);
            if (['+', '-', '*', '/', '%'].includes(lastChar)) {
                this.expression = this.expression.slice(0, -1);
            }
        }
        this.expression += value;
        this.updateDisplay();
    },

    clearDisplay() {
        this.expression = '';
        this.elements.result.value = '';
        this.updateDisplay();
    },

    updateDisplay() {
        this.elements.expression.value = this.expression;
        this.elements.expression.scrollLeft = this.elements.expression.scrollWidth;
    },

    backspace() {
        this.expression = this.expression.slice(0, -1);
        this.updateDisplay();
    },

    calculateResult() {

        let expr = this.expression;
        if (expr === '' && this.resultShown) {
            expr = this.storeExpression;
            this.expression = expr;
        }

        try {
            if (expr === '' || /[\+\-\*\/%]$/.test(expr)) {
                this.elements.result.value = "ERROR";
                return;
            }
            const result = new Function(`return ${expr}`)();

            this.storeExpression = this.expression;
            this.elements.result.value = result;
            this.expression = '';
            this.resultShown = true;
        } catch (error) {
            this.elements.result.value = 'ERROR';
        }
    },

    setupEventListener() {
        this.elements.keypad.addEventListener('click', (e) => {
            const button = e.target.closest(".keypad_btn");
            if (button) {
                this.handleButtonClick(button);
            }
        });
    }
}
calculator.init();





