import { Component, OnInit, ChangeDetectionStrategy, DoCheck, OnDestroy,} from '@angular/core';
import { TodoService } from '../todo.service';
import { Todos, TodoUtils } from '../todo';
import { ActivatedRoute } from '@angular/router';
import { FilterUtil, Filter } from '../filter';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  //기본변경감지기가 변경을 감지하는데 사용하는 전략
})
export class TodoComponent implements OnInit, DoCheck {
  reset = ''; //빈 문자열
  todos: Todos[];
  currentTodo: Todos; //형식
  snapshot: Todos; //형식
  allCompleted: boolean;
  completed: number;
  remaining: number;
  filter = Filter.ALL;//filter의 종류
  filterTodos : Todos[];
  

  //toService외에  필터 경로를 연결하기 위해서  ActivatedRoute
  constructor(private toService: TodoService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    //처음 그냥todo로 test;
    this.todos = this.toService.findAll();

    this.route.params.subscribe((params) => {
      // params(['상태']),초기설정할때처음
      this.filter = FilterUtil.fromString(params['filter']);
    });
  }

  //add
  add(todoAdd: string) {
    if (todoAdd.trim().length === 0) return;
    this.toService.add(todoAdd);
    // console.log(todoAdd);
    this.reset = '';
  }

  //delete시
  delete(todo: Todos) {
    console.log(todo);
    this.toService.delete(todo);
  }

  //update
  update(todo: Todos) {
    this.currentTodo = null;
    this.snapshot = null;
    this.toService.update(todo);
    console.log(this.currentTodo?.id);
    console.log(todo.id);
  }

  //edit component 더블클릭시 인풋,

  edit(todo: Todos) {
    //get
    this.currentTodo = todo;
    console.log(this.currentTodo);
    console.log(this.currentTodo?.id);
    console.log(todo.id);
    this.snapshot = TodoUtils.copy(todo);
  }
  //esc눌럿을때
  cancelEdit() {
    //날리고
    TodoUtils.copyProperties(this.snapshot, this.currentTodo);
    this.currentTodo = null;
    this.snapshot = null;
  }

  ngDoCheck(): void {
    this.todos = this.toService.findAll();
    this.remaining = this.completed = 0; //reset
    //true면 complete값을 올려, fasle면 리메이닝으로 해야될일만 남음 그거의 개수
    this.todos.forEach((t) =>
      t.completed ? this.completed++ : this.remaining++
    );
    //투두의 개수와 == 위에 계산했더니 완성된 값 true 개수가 같아 그러면  true지 ,하나라도 다르면 false
    this.allCompleted = this.todos.length === this.completed;
    console.log(this.allCompleted);


    //리턴받아 this.filter => 쇼올인지 쇼액티브인지 쇼컴플리트인지 routeLink클릭된것이 
    this.todos = this.todos.filter((t) => FilterUtil.accepts(t, this.filter));
    

  }

  //check되있는지 안되있는지를 읽어와서
  toggleCheckAll(CheckAll: boolean) {
    this.allCompleted = CheckAll;
    this.toService.toggelCheckAll(CheckAll);
  }
  toggle(todo: Todos) {
    this.toService.toggle(todo);
  }
  clearCompleted() {
    this.toService.clearCompleted();
  }
}
