import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {OnboardingComponent} from './onboarding/onboarding.component';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CtaComponent} from './cta/cta.component';
import {CoreModule} from './core/core.module';
import {AuthGuard} from './core/auth.guard';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {DashboardHeaderComponent} from './dashboard-header/dashboard-header.component';
import {DashboardFooterComponent} from './dashboard-footer/dashboard-footer.component';
import {LoaderComponent} from './loader/loader.component';
import {AddArticleComponent} from './add-article/add-article.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditArticleComponent} from './edit-article/edit-article.component';
import {OneSignalService} from './one-signal.service';
import {SettingsComponent} from './settings/settings.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';

const config = {
  'apiKey': '*************************',
  'authDomain': '*************************',
  'databaseURL': '*************************',
  'projectId': '*************************',
  'storageBucket': '*************************',
  'messagingSenderId': '*************************'
};


const appRoutes: Routes = [
  {path: '', component: OnboardingComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {
    path: 'add-article',
    component: AddArticleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-article/:id',
    component: EditArticleComponent,
    canActivate: [AuthGuard],
  },
  {path: 'login', component: LoginComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    OnboardingComponent,
    PageNotFoundComponent,
    CtaComponent,
    DashboardComponent,
    LoginComponent,
    DashboardHeaderComponent,
    DashboardFooterComponent,
    LoaderComponent,
    AddArticleComponent,
    EditArticleComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    CoreModule,
    AngularFireModule.initializeApp(config),
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js',
        {enabled: environment.production}),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [AuthGuard, OneSignalService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
