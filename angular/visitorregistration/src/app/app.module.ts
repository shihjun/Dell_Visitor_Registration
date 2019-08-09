import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubmitRequestComponent } from './submit-request/submit-request.component';
import { SubmitRequestSuccessAlert } from './submit-request/submit-request.component';
import { RequestListComponent } from './request-list/request-list.component';
import { RequestDetailsComponent, CancelRequestSuccessAlert } from './request-details/request-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { EditRequestComponent, SaveRequestSuccessAlert } from './edit-request/edit-request.component';
import { UsersComponent } from './users/users.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    SubmitRequestComponent,
    RequestListComponent,
    RequestDetailsComponent,
    SubmitRequestSuccessAlert,
    EditRequestComponent,
    UsersComponent,
    SaveRequestSuccessAlert,
    CancelRequestSuccessAlert,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  entryComponents: [SubmitRequestSuccessAlert, CancelRequestSuccessAlert, SaveRequestSuccessAlert]
})
export class AppModule { }
