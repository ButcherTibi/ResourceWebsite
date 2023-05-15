import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DownwardChild, DataBindingParent, UpwardChild, TwowayChild } from './Practice/DataBindingPractice/DataBindingPractice';
import { HooksChild, HooksPractice } from './Practice/HooksPractice/HooksPractice';
import { DirectivesPractice } from './Practice/DirectivesPractice/DirectivesPractice';
import { CommonModule } from '@angular/common';
import { ModelPractice } from './Practice/ModelPractice/ModelPractice';
import { ImagePage } from './Pages/ImagePage/ImagePage';
import { PageWrapper } from './Pages/PageWrapper/PageWrapper';
import { Rating } from './Rating/Rating';
import { DateOnly, LargeNumber, When } from 'src/Pipes/Pipes';
import { Recomendation } from './Recomendation/recomendation';
import { AuthenticatePopup } from './Authenticate/Authenticate';
import { ChannelPage } from './Pages/ChannelPage/ChannelPage';
import { EditImagePage } from './Pages/EditImagePage/EditImagePage';
import { SigninPage } from './Pages/SigninPage/SigninPage';
import { EditImageGuard } from 'src/RouteGuards/EditImageGuard';
import { EditChannelPage } from './Pages/EditChannelPage/EditChannelPage';
import { ImageInput } from './ImageInput/ImageInput';


// TODO:
// OnChange lifecycle hook


@NgModule({
  declarations: [
    AppComponent,

    // Practice
    DataBindingParent,
    DownwardChild,
    UpwardChild,
    TwowayChild,
    HooksPractice,
    HooksChild,
    DirectivesPractice,
    ModelPractice,

    // Components
    PageWrapper,
    Rating,
    AuthenticatePopup,
    Recomendation,
	ImageInput,
	
	// Pages
	SigninPage,
    ImagePage,
	EditImagePage,
	ChannelPage,
	EditChannelPage,

    // Pipes
    LargeNumber,
    When,
    DateOnly
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      // { path: '', component: HomeComponent, pathMatch: 'full' },

      // Practice
      { path: 'downward', component: DataBindingParent },
      { path: 'hooks', component: HooksPractice },
      { path: 'directives', component: DirectivesPractice },
      { path: 'model', component: ModelPractice },

      // For Real
	  { path: 'signin', component: SigninPage },
      { path: 'image', component: PageWrapper },
	  { path: 'channel', component: PageWrapper },
	  { path: 'editchannel', component: EditChannelPage },
      { path: 'addimage', component: EditImagePage },
      { path: 'editimage', component: EditImagePage, canActivate: [EditImageGuard] }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
