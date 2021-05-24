import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { environment } from 'src/environments/environment';
import { DiscordEmbedComponent } from './discord-embed/discord-embed.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { CardComponent } from './downloads/card/card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShareComponent } from './share/share.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { FooterComponent } from './footer/footer.component';
import { StreamsComponent } from './streams/streams.component';
import { SocialBadgeComponent } from './social-badge/social-badge.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { IstiComponent } from './profiles/isti/isti.component';
import { NorticusComponent } from './profiles/norticus/norticus.component';
import { WalruszComponent } from './profiles/walrusz/walrusz.component';
import { DiscordNewsComponent } from './discord-news/discord-news.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { UploaderComponent } from './upload/uploader/uploader.component';
import { UploaderTaskComponent } from './upload/uploader-task/uploader-task.component';
import { DropzoneDirective } from './dropzone.directive';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DiscordEmbedComponent,
    DownloadsComponent,
    CardComponent,
    ShareComponent,
    FooterComponent,
    StreamsComponent,
    SocialBadgeComponent,
    NotFoundComponent,
    ProfilesComponent,
    IstiComponent,
    NorticusComponent,
    WalruszComponent,
    DiscordNewsComponent,
    UploaderComponent,
    UploaderTaskComponent,
    DropzoneDirective,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'waik-hu' }),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressBarModule,
    MatCardModule,
    MatSnackBarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
