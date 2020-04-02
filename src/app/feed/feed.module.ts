import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';

// import { NgMasonryGridModule } from 'ng-masonry-grid';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AgmCoreModule } from '@agm/core';
import { MapmodalComponent } from './mapmodal/mapmodal.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [FeedComponent, MapmodalComponent],
  entryComponents: [MapmodalComponent],
  imports: [
    CommonModule,
    FeedRoutingModule,
    // NgMasonryGridModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    AgmCoreModule
  ],
  providers:[MapmodalComponent,NgbActiveModal]
})
export class FeedModule { }
