import {hello} from'./greet'

const register = (registerRequest) => {
    console.log(registerRequest); 
}

const foo = "boo";
const registerBtn = document.querySelector('button.register');

registerBtn.addEventListener('click', () => {
    register({"name": "Ania", "xyz": 'foo'});
});

(() => {
    hello("Ania :D");
})();