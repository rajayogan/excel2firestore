import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

//Angularfire2
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { DashboardComponent } from './dashboard/dashboard.component';

//Services
import { AuthService } from './services/auth.service';
import { AuthguardService } from './services/authguard.service';
import { XltofirestoreService } from './services/xltofirestore.service';

//environments
import { environment } from '../environments/environment';

//routes
import { appRoutes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule.enablePersistence(),
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthguardService,
    AuthService,
    AngularFireAuth,
    XltofirestoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
