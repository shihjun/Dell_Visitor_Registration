import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestListComponent } from './request-list/request-list.component';
import { SubmitRequestComponent } from './submit-request/submit-request.component';
import { RequestDetailsComponent } from './request-details/request-details.component';

const routes: Routes = [
  { path: '', component: SubmitRequestComponent },
  { path: 'user/userId/requests', component: RequestListComponent },
  { path: 'user/userId/requests/requestId', component: RequestDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
