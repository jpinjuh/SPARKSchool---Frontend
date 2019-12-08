// ========== 1. zadatak ==========

// creating form
const form = document.createElement('form');
form.id = 'form';
document.body.insertBefore(form, document.body.firstElementChild);

// function for creating inputs; returns wanted input
function createInput (type, value){
    let input = document.createElement('input');
    input.type = type;
    if (value) input.value = value;
    form.appendChild(input);
    return input;
}
const username = createInput('text',); // creating input field for username
const password = createInput('password'); //creating input field for password
const repeatPassword = createInput('password'); // creating input field for repeat password
const resetBtn = createInput('submit', 'Reset'); // creating reset button
const submit = createInput('submit', 'Submit'); // creating submit button

// Reg Exp for validation 
var inputRange = /^.{5,16}$/; 
var onlyLettersAndNumsReg = /^[a-zA-Z\d]+$/;  
var passwordReg = /^(?=.*?\d)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[À-ž])(?=.*?[!?.:,;-])[A-Za-z\dÀ-ž!?.:,;-]+$/;
 
// the function returns whether the input is between 5 and 16 characters
function isLong(inputText) {
    return inputText.value.match(inputRange);
}
// function returns whether the input contains only letters and numbers 
function usernameValidation() {
    return username.value.match(onlyLettersAndNumsReg);
}
// function returns whether the input contains at least one uppercase, at least one number, at least one diacritic
function passwordValidation(){
    return password.value.match(passwordReg);
}
// function for creating error messsage
const message = document.createElement('div');
function displayMessage(text, color){
    message.innerText = text;
    message.style.color = color;
    form.insertBefore(message, resetBtn)
}

// adding style when entering data: red - wrong entry, green - correct entry
form.addEventListener('input', (e) => {
    const target = e.target
    switch(target){
        case username:
            e.stopPropagation();
            target.style.border = (isLong(target) && usernameValidation())
            ? '2px solid #a1c900'
            : '2px solid red';
            break;
        case password:
            e.stopPropagation();
            target.style.border = (isLong(target) && passwordValidation())
            ? '2px solid #a1c900'
            : '2px solid red';
            break;
        case repeatPassword:
            e.stopPropagation();
            target.style.border = (target.value === password.value && isLong(password) && passwordValidation())
            ? '2px solid #a1c900'
            : '2px solid red';
            break;
    }
}, false);

// displays a message depending on the condition
submit.addEventListener('click', (e) =>{
    e.preventDefault();
    if((isLong(username) && 
        isLong(password) && 
        usernameValidation() && 
        passwordValidation() && 
        (repeatPassword.value === password.value))){
        displayMessage('Form data sent!', 'green');
        // reseting input border style; reseting input values
        [username,password, repeatPassword].forEach(input => {
            input.style.border = null;
            input.value = null;
        });
    } else {
        displayMessage('Invalid input!!!', 'red');
    }
}, false);

// reset every text input and display message
resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    [username,password, repeatPassword].forEach(input => {
        input.style.border = null;
        input.value = null;
    });
    displayMessage('Succesfully reseted!', 'black');
}, false);

// ========== 2. zadatak ==========

// get html elements
const container = document.querySelector('#container');
const wrapper = document.querySelector('#list-wrapper');
const generate = document.querySelector('.generate');
const colorize = document.querySelector('.colorize');
const removeItems = document.querySelector('.remove');

// create ul list
const list = document.createElement('ul');
list.id = 'list';
wrapper.appendChild(list);
// creating dropzone
const dropzone = document.createElement('div');
dropzone.id = 'dropzone';
container.appendChild(dropzone);
// creating h2 title for dropzone
const title = document.createElement('h2');
title.innerText = 'Done';
dropzone.appendChild(title);
// in this variable we store the element we drag from the generated list
let draggedItem = null;

// generate random color
function randomColor(){
    return '#' + ('000000' + ((Math.random()*16777215).toString(16))).slice(-6);
}
// generate random number
function randomNum(){
    return Math.floor(Math.random()*10 + 1);
}
// function for creating anchor elements
function createLink(href, text){
    var link = document.createElement('a');
    link.href = href;
    link.innerText = text;
    link.target = '_blank';
    return link;
}

generate.addEventListener('click', (e) => {
    // clear out the list
    list.innerHTML = null;
    let colorizeCheck = false, removeItemsCheck = false;

    // colorize is active and removeItems is inactive
    colorize.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        colorizeCheck = true;
        removeItemsCheck = false;
    }, false);
    // removeItems is active and colorize is inactive
    removeItems.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        colorizeCheck = false;
        removeItemsCheck = true;
    }, false);

    // generate list items
    for(let i = 1; i <= randomNum(); i++){
        let item = document.createElement('li');
        item.className = 'item';
        item.innerHTML = i;
        item.draggable = true;
        list.appendChild(item);
        // hovering over list item change color to gray
        item.addEventListener('mouseover', (e) => {
            item.style.backgroundColor = '#dbdbdb';
        },false);
        // when mouse leave list item remove gray color 
        item.addEventListener('mouseleave', (e) => {
            item.style.backgroundColor = '';
        }, false);

        // store dragged item from the list to variable draggedItem
        item.addEventListener('dragstart', (e) => {
            draggedItem = e.target;
        }, false);

        // colorize or remove item depending on which button is active
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            if(colorizeCheck){
                item.style.border = `1px solid ${randomColor()}`;
            } else if(removeItemsCheck){
                item.remove();
            }
        }, false);
    }

    if(list.childElementCount > 1){
        //add link to second item of list
        list.firstElementChild.nextElementSibling.appendChild(createLink('https://www.google.com', 'Google'));
        // add shadow with link to penultimate item of list
        const spanShadow = document.createElement('span');
        const shadow = spanShadow.attachShadow({mode:'open'});
        shadow.appendChild(createLink('https://www.facebook.com', 'Facebook'));
        list.lastElementChild.previousElementSibling.appendChild(spanShadow);
    }
});

// dropzone effect when we drag over dropzone
dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.style.border = '2px solid #e0e0e0';
}, false);
// removes effect 
dropzone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropzone.style.border = null;
}, false);
// append item of generated list to dropzone
dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropzone.appendChild(draggedItem); 
    dropzone.style.border = null;
}, false);


