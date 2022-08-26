import { Injectable } from '@angular/core';
import {Todos} from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  id= 0;
  todos: Todos[];
  private static KEY = 'todo';

  constructor() { 
    this.storage();
    if (this.todos.length > 0) {
			this.id = this.todos[this.todos.length - 1].id;
       
		}

  
    
  }

  findAll(){
    return this.todos;

  }
  //add
  add(todoAdd: string): Todos
  {
    // console.log(this.todos);
    todoAdd = todoAdd.trim();

    //아이디증가, 값 
    const newTodo = new Todos(++this.id, todoAdd);
    this.todos.push(newTodo);

    console.log(this.todos);

    this.save();

    return newTodo;

  }
  //delete
  delete(todo: Todos){
    this.todos = this.todos.filter((t)=> t !== todo);
    
    console.log(this.todos);
    this.save();

  }
  //delete시 저장하면 바로 뷰에안나오기 때문에 

  //update
  update(todo: Todos){
    todo.title = todo.title.trim();
		if (todo.title.length === 0) {
			this.delete(todo);
		}
		this.save();
  }


  //localstorage 저장 키값, 값
private storage(){
  const storageValue = localStorage.getItem(TodoService.KEY);
  try{
    this.todos = JSON.parse(storageValue);
  }catch(ignore){
    this.todos  = [];
  }
}

private save(): void{
  localStorage.setItem(TodoService.KEY, JSON.stringify(this.todos));
}

toggelCheckAll(CheckAll: boolean){
  //CheckAll true or false;

  console.log(CheckAll);
  this.todos.forEach((t)=>{t.completed = CheckAll});
  this.save();
}

// save
toggle(todo: Todos){
  todo.completed  = !todo.completed;
  this.save();
}

//true된거만 삭제
clearCompleted(){
  //투루가 아닌거만이니까 false값만 필터링해서 저장 셋
  this.todos = this.todos.filter((t)=>{ !t.completed})
  this.save();

}

}
