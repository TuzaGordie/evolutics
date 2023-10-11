import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'workflowsFilter',
})
export class WorkflowsFilterPipe implements PipeTransform{
    transform(workflows: any[], startFrom: string, startTo: string, slaLevel: string, status: string): any[] {
        // if no filters, return an unfiltered list
        if (!(startFrom || startTo || slaLevel || status)) return workflows;

        return workflows.filter(
            workflow => (
                this.stripTime(workflow.startOn) === startFrom ||
                this.stripTime(workflow.dueOn) === startTo ||
                workflow.slaLevel === slaLevel ||
                workflow.status === status
            )
        )
    }

    stripTime(dateString: string): string{
        return dateString.split('T')[0]
    }
}