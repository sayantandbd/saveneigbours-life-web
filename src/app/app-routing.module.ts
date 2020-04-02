import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { DefaultComponent } from './default/default.component';
import { AuthGuardService } from './services/auth-guard.service';
const routes: Routes = [
  {
    path:'',
    component:DefaultComponent,
    children: [
      {
          path: '',
          redirectTo: 'home',
          pathMatch: 'full',
      },
      {
        path:'home',
        component:HomeComponent
      },
      {
        path: 'feed',
        canActivate:[AuthGuardService],
        loadChildren: () => import('./feed/feed.module').then(m => m.FeedModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
      }
  ],
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
