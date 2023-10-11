import { NgModule } from "@angular/core";
import { StripTimePipe } from "./strip-time.pipe";
import { FormatMinutesPipe } from "./format-minutes.pipe";
import { SlaLevelColourPipe } from "./sla-level-colour.pipe";
import { WorkflowsFilterPipe } from "./workflows-filter.pipe";
import { SocialMediaLogo } from "./social-media-logo.pipe";
import { StatusNamePipe } from './status-name.pipe';
import { FullNamePipe } from './full-name.pipe';

const pipes = [
    FormatMinutesPipe,
    SlaLevelColourPipe,
    WorkflowsFilterPipe,
    StripTimePipe,
    SocialMediaLogo,
    StatusNamePipe,
    FullNamePipe,
]

@NgModule({
    declarations: pipes,
    exports: pipes, // make them available in component template via: value | pipeName
    providers: pipes, // make it possible for other modules to use them in component itself via: pipe.transform(value)
})
export class ClientDeskPipesModule {}