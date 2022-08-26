import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: ':filter', component: TodoComponent },
  { path: '**', redirectTo: '/all' }
];



// 필터 라우터아울렛 위치지정 routes를 상위루트로지정
@NgModule({
  declarations: [
    AppComponent,
    TodoComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
