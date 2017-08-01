import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EntryComponent } from './components/entry/entry.component';

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import { ExportComponent } from './components/export/export.component';
import { AuthGuard } from './guards/auth.guard';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { DummyComponent } from './components/dummy/dummy.component';

const appRoutes: Routes = [
  {path:'', component: LoginComponent},
  {path:'home', component: HomeComponent, canActivate:[AuthGuard]},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'entry/:id', component: EntryComponent, canActivate:[AuthGuard]},
  {path:'dummy/:id', component: DummyComponent, canActivate:[AuthGuard]},
  {path:'export', component: ExportComponent, canActivate:[AuthGuard]},
  {path:'**', component: PagenotfoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent,
    HomeComponent,
    EntryComponent,
    ExportComponent,
    PagenotfoundComponent,
    DummyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
