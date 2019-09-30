const form = document.querySelector(".js-form"),
 input = form.querySelector("input"),
 greeting = document.querySelector(".js-greetings");

 // querySelector: css 방식으로 클래스, 아이디, 태그 모두 가져올 수 있음
 // 찾은 것의 첫 번째를 가져옴

 //querySeletorAll : 해당하는 element를 모두 가져와서 array 생

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text){
  localStorage.setItem(USER_LS,text);
}

// local storage : 작은 정보들을 저장


function handleSubmit(event){
   event.preventDefault();  // event가 작동했을 때의 디폴트값을 없애서 다른 동작을 막
   const currentValue = input.value;
   paintGreeting(currentValue); // input에 저장한 value를 가져와 'hello ~'로 출력
   saveName(currentValue);
}

function askForName(){
  form.classList.add(SHOWING_CN); // makes form's display:block
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN); // make h4 display:block
  greeting.innerText = `Hello ${text}`;  // h4의 텍스트 지정
}

function loadName(){
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null){
    askForName(); // there's no currentUser, we ask the name with form
  } else {
    paintGreeting(currentUser);
  }
}

function init(){
  loadName();
};

init();
