export class Todos{
    id: number;
    title: string;
    completed: boolean;

    constructor(id:number, title:string, completed?: boolean){
        this.id = id;
        this.title = title;
        this.completed = completed ? completed : false;
    }
}

export class TodoUtils{
    static copy(todo: Todos){
        const copy = new Todos(null, null);
        this.copyProperties(todo, copy);
        return copy;
    }

    static copyProperties(src: Todos, dest:Todos){
        dest.id = src.id;
        dest.title = src.title;
        dest.completed = src.completed; 
    }
}
