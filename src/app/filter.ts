import {Todos} from './todo';

export enum Filter {
	ALL = 'SHOW_ALL', ACTIVE = 'SHOW_ACTIVE', COMPLETED = 'SHOW_COMPLETED'
}

export class FilterUtil {
	static fromString(filter: string): Filter {
		switch (filter) {
			case 'completed':
				return Filter.COMPLETED;
			case 'active':
				return Filter.ACTIVE;
			case 'all':
			default:
				return Filter.ALL;
		}
	}

	static accepts(todo: Todos, filter?: Filter): boolean {
		switch (filter) {
			case Filter.ACTIVE:
				return !todo.completed;
                //트루가아닌것,false로해야될것만 모아
			case Filter.COMPLETED:
				return todo.completed;
                //true만
			case Filter.ALL:
			default:
				return true;
		}
	}
}