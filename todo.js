const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];   // 해야할 일을 생성할 때마다 array에 저장됨

function deleteToDo(event){
  const btn = event.target; // 해당 아이템
  const li = btn.parentNode; // 버튼의 부모인 li
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
    // li.id is string so make them number
    // id가 2인 목록을 삭제할 경우 'id = 2'를 제외한 목록이 toDo에 저장됨
  });
  // filter : create an array with the items that fucntion return true.
  // 함수를 실행해 true을 반환하는 object가 담긴 새로운 array를 만들어냄
  toDos = cleanToDos; // toDos is old one, so replace to cleanToDos
  saveToDos(); // after deleting, save again
}

function saveToDos(){
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));  // make object that saved in local storage into string
} // take todos and save them

function paintToDo(text){
  const li = document.createElement("li");  // make 'li'
  const delBtn = document.createElement("button"); // make 'delete button'
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";  // delBtn's text
  delBtn.addEventListener("click",deleteToDo);
  span.innerText = text;
  li.appendChild(span);  //appendChild : put sth in parent element
  li.appendChild(delBtn);  // put 'span' and 'delBtn' into 'li'
  li.id = newId;  // 새로 생성된 목록에 id 부여
  toDoList.appendChild(li);  // put 'li' that we made above into 'ul(toDoList)'
  const toDoObj = {
    text: text,
    id: newId
  };              // form에 입력한 text가 저장됨
  toDos.push(toDoObj);  // 저장된 text를 toDos의 array에 저장
  saveToDos(); // toDos에 입력한 후 local storage에 저장
}

function handleSubmit(event){  // submit이라는 event가 발생했을 때
  event.preventDefault();
  const currentValue = toDoInput.value;  // input에 입력한 값 저장
  paintToDo(currentValue);
  toDoInput.value="";
}

function loadToDos(){
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null){
    const parsedToDos = JSON.parse(loadedToDos); // switch string to object
    parsedToDos.forEach(function(toDo){
      paintToDo(toDo.text); // 입력한 to do들을 저장한 것을 object로 변경
    })
  }
}

function init(){
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
