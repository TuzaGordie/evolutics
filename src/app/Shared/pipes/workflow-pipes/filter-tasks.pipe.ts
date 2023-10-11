import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterTasks',
})
export class FilterTasksPipe implements PipeTransform{
    transform(tasks, slaLevel) {
        return tasks.filter(task => task.slaLevel === slaLevel)
    }
}