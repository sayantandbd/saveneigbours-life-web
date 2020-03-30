import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';

import { NgMasonryGridModule } from 'ng-masonry-grid';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    FeedRoutingModule,
    NgMasonryGridModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class FeedModule { }
