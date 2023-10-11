import { NgModule } from "@angular/core";
import { FilterTasksPipe } from "./filter-tasks.pipe";
import { FormatMinutesPipe } from "./format-minutes.pipe";
import { SlaLevelColourPipe } from "./sla-level-colour.pipe";
import { TruncateToPipe } from "./truncate-to.pipe";
import { WorkflowsFilterPipe } from "./workflows-filter.pipe";

@NgModule({
    declarations: [
        FormatMinutesPipe,
        SlaLevelColourPipe,
        WorkflowsFilterPipe,
        FilterTasksPipe,
        TruncateToPipe,
    ],
    exports: [
        FormatMinutesPipe,
        SlaLevelColourPipe,
        WorkflowsFilterPipe,
        FilterTasksPipe,
        TruncateToPipe,
    ]
})
export class WorkflowPipesModule {}