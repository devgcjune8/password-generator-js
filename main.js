const PASSWORD = document.querySelector('.password');
const PASSWORD_LENGTH = document.querySelector('#pass-length');
const PASSWORD_UPPERCASE = document.querySelector('#pass-uppercase');
const PASSWORD_LOWERCASE = document.querySelector('#pass-lowercase');
const PASSWORD_SYMBOL = document.querySelector('#pass-symbols');
const PASSWORD_NUMBER = document.querySelector('#pass-number');
const PASSWORD_GENERATE_BTN = document.querySelector('#generate-btn');
const PASSWORD_COPY_BTN = document.querySelector('.copy-password');

const randomFunctionObj = {
    lower: getRandomlowercase,
    upper: getRandomUpperCase,
    num: getRandomNumber,
    sym: getRandomSymbols
}

PASSWORD_GENERATE_BTN.addEventListener('click', () => {
    const LENGTH = +PASSWORD_LENGTH.value;
    const LOWERCASE = PASSWORD_LOWERCASE.checked;
    const UPPERCASE = PASSWORD_UPPERCASE.checked;
    const SYMBOL = PASSWORD_SYMBOL.checked;
    const NUMBER = PASSWORD_NUMBER.checked;

    PASSWORD.innerText = generatePassword(LOWERCASE, UPPERCASE, SYMBOL, NUMBER, LENGTH)
})

PASSWORD_COPY_BTN.addEventListener('click', () => {
    const TEXT_AREA = document.createElement('textarea')
    const PASS_WORD = PASSWORD.innerText

    if(!PASS_WORD) {return}

    TEXT_AREA.value = PASS_WORD
    document.body.appendChild(TEXT_AREA)
    TEXT_AREA.select()
    document.execCommand('copy')
    TEXT_AREA.remove()
    alert("Password copied to system clipboard")
})


function generatePassword(lower, upper, sym, num, length) {
    let generatedPassword = '';
    const typesEnabled = lower + upper + sym + num;
    const typesArr = [{lower} , {upper}, {sym}, {num}]
    .filter(item => Object.values(item)[0])
    console.log(typesArr)

    if (typesEnabled === 0) {
        return ''
    }

    for ( let i = 0; i < length; i+=typesEnabled ) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunctionObj[funcName]()
        })
    }

    const passwordItself = generatedPassword.slice(0, length)

    return passwordItself
}

function getRandomlowercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97) //ASCII a-z
}

function getRandomUpperCase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65) //ASCII A-Z
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48) //ASCII 0-9
}

function getRandomSymbols() {
    const SPECIAL_CHARACTERS = '!@#$%^&*()_+=><?,./][{}:;'

    return SPECIAL_CHARACTERS[Math.floor(Math.random() * SPECIAL_CHARACTERS.length)]
}

console.log(getRandomSymbols())