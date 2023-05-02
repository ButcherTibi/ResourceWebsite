import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { DownwardChild, DataBindingParent, UpwardChild, TwowayChild } from './DataBindingPractice/DataBindingPractice';
import { HooksChild, HooksPractice } from './HooksPractice/HooksPractice';
import { DirectivesPractice } from './DirectivesPractice/DirectivesPractice';
import { CommonModule } from '@angular/common';
import { ModelPractice } from './ModelPractice/ModelPractice';
import { ImagePage } from './ImagePage/ImagePage';
import { PageWrapper } from './PageWrapper/PageWrapper';
import { Rating } from './Rating/Rating';
import { DateOnly, LargeNumber, When } from 'src/Pipes/Pipes';
import { Recomendation } from './Recomendation/recomendation';
import { CreateAccount } from './CreateAccount/CreateAccount';
import { Login } from './Login/Login';


// TODO:
// OnChange lifecycle hook


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,

    // Practice
    DataBindingParent,
    DownwardChild,
    UpwardChild,
    TwowayChild,
    HooksPractice,
    HooksChild,
    DirectivesPractice,
    ModelPractice,

    // For Real
    ImagePage,
    PageWrapper,
    Rating,
    CreateAccount,
	Login,

    // Pipes
    LargeNumber,
    When,
    DateOnly,
    Recomendation
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },

      // Practice
      { path: 'downward', component: DataBindingParent },
      { path: 'hooks', component: HooksPractice },
      { path: 'directives', component: DirectivesPractice },
      { path: 'model', component: ModelPractice },

      // For Real
      { path: 'resource', component: PageWrapper },
      { path: 'signup', component: CreateAccount }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
