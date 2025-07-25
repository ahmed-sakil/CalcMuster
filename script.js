
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
    })
});


//===== STANDARD CALCULATOR =====//
const calculator = {
    hello(){
        console.log("hi");
    },
    expression: '',
    storeExpression: '',
    resultShown: false,

    elements:{
        expression: document.getElementById("calculator-expression"),
        result: document.getElementById("calculator-result"),
        keypad: document.getElementById("standard__keypad")
    },

    init(){
        this.setupEventListener();
    },

    handleButtonClick(button){
        const action = button.dataset.action;
        const value = button.dataset.value;

        if(this.resultShown){
            if(action === 'operator'){
                this.expression = this.elements.result.value;
                this.resultShown = false;
            }
            else if(action !== 'clear' && action !== 'backspace'){
                this.clearDisplay();
                this.resultShown = false;
            }
        }

        switch(action){
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

    appendToExpression(value){
        if(value === '.' && /\.\d*$/.test(this.expression)){
            return;
        }

        if(['+','-','*','/','%'].includes(value)){
            const lastChar = this.expression.slice(-1);
            if(['+','-','*','/','%'].includes(lastChar)){
                this.expression = this.expression.slice(0, -1);
            }
        }
        this.expression += value;
        this.updateDisplay();
    },

    clearDisplay(){
        this.expression = '';
        this.elements.result.value = '';
        this.updateDisplay();
    },

    updateDisplay(){
        this.elements.expression.value = this.expression;
        this.elements.expression.scrollLeft = this.elements.expression.scrollWidth;
    },

    backspace(){
        this.expression = this.expression.slice(0, -1);
        this.updateDisplay();
    },

    calculateResult(){
        let expr = this.expression;
        try{
            if(expr === '' || /[\+\-\*\/%]$/.test(expr)){
                this.elements.result.value = "ERROR";
                return;
            }
            const result = new Function(`return ${expr}`)();

            this.storeExpression = this.expression;
            this.elements.result.value = result;
            this.expression = '';
            this.resultShown = true;
        } catch(error){
            this.elements.result.value = 'ERROR';
        }
    },

    setupEventListener(){
        this.elements.keypad.addEventListener('click', (e)=>{
            const button  = e.target.closest(".keypad_btn");
            if(button){
                this.handleButtonClick(button);
            }
        });
    }
}
calculator.init();








































// const calculatorExpression = document.getElementById("calculator-expression");
// const calculatorResult = document.getElementById("calculator-result");
// let currentExpression = "";
// let storedExpression = ""
// let resultShown = false;


// function appendToExpression(value) {
//     currentExpression += value;
//     calculatorExpression.value = currentExpression;
// }

// function allClearExpression() {
//     currentExpression = "";
//     calculatorExpression.value = currentExpression;
//     calculatorResult.value = "";
// }

// function backspaceOnExpression() {
//     currentExpression = currentExpression.slice(0, -1);
//     calculatorExpression.value = currentExpression;
// }

// function getResult() {
//     let expression = calculatorExpression.value;
//     let result = eval(expression);
//     calculatorResult.value = result;
//     storedExpression = currentExpression;
//     currentExpression = "";
//     calculatorExpression.value = currentExpression;
//     resultShown = true
// }

// function previousExpression() {
//     currentExpression = storedExpression;
//     calculatorExpression.value = currentExpression;
//     storedExpression = ""
//     resultShown = false
// }

// let keypadBtns = document.querySelectorAll(".keypad_btn");
// keypadBtns.forEach(btn => {
//     btn.addEventListener('click', () => {
//         if(resultShown == true)
//         {
//             resultShown = false;
//         }
//         appendToExpression(btn.value);
//     })

// })

// const allClear = document.getElementById("all_clear");
// if (allClear) {
//     allClear.addEventListener('click', () => {
//         allClearExpression();
//     })
// }

// const backspace = document.getElementById("backspace");
// if (backspace) {
//     backspace.addEventListener('click', () => {
//         if (!resultShown) {
//             backspaceOnExpression();
//         }
//         else {
//             previousExpression();
//         }
//     })
// }

// const equal = document.getElementById("equal");
// if (equal) {
//     equal.addEventListener('click', () => {
//         if(!resultShown){
//             getResult();
//         }
//         else{

//         }
//     })
// }