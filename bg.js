const body = document.querySelector("body");

const IMG_NUMBER = 7;


function paintImage(imgNumber){
    const image = new Image();
    image.src = `img/${imgNumber + 1}.jpg`;
    // have to add 1 because random number can return 0
    image.classList.add('bgImage');
    body.appendChild(image);
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
    // Math.floor : 내림, Math.ceil : 올림
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();
