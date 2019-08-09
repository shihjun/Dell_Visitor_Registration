import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestListComponent } from './request-list/request-list.component';
import { SubmitRequestComponent } from './submit-request/submit-request.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { EditRequestComponent } from './edit-request/edit-request.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'user/:userId/submitrequest', component: SubmitRequestComponent },
  { path: 'users', component: UsersComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'user/:userId/requests', component: RequestListComponent },
  { path: 'user/:userId/request/:requestId', component: RequestDetailsComponent },
  { path: 'user/:userId/request/:requestId/edit', component: EditRequestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
