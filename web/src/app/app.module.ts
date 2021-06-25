import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
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
import { DropzoneDirective } from './dropzone.directive';
import { FanartsComponent } from './fanarts/fanarts.component';
import { ImagesComponent } from './fanarts/images/images.component';
import { ImageDialogComponent } from './fanarts/image-dialog/image-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AccountComponent } from './account/account.component';
import { ProfileIconComponent } from './profile-icon/profile-icon.component';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTabsModule } from '@angular/material/tabs'
import { UploadComponent, UploadSubmitPromptDialog } from './fanarts/upload/upload.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'
import { CompetitionComponent } from './fanarts/competition/competition.component';
import { AutoFormDirective } from './auto-form.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatBadgeModule } from '@angular/material/badge'
import { AuthComponent } from './auth/auth.component';
import { DiscordComponent } from './auth/discord/discord.component';
import { MatChipsModule } from '@angular/material/chips';
import { AdminComponent } from './admin/admin.component';
import { MatSidenavModule } from '@angular/material/sidenav';
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
    DropzoneDirective,
    FanartsComponent,
    ImagesComponent,
    ImageDialogComponent,
    AccountComponent,
    ProfileIconComponent,
    UploadComponent,
    CompetitionComponent,
    AutoFormDirective,
    FanartsComponent,
    AuthComponent,
    DiscordComponent,
    UploadSubmitPromptDialog,
    AdminComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'waik-hu' }),
    AppRoutingModule,
    //AngularFireModule.initializeApp(environment.firebaseConfig),
    //AngularFireStorageModule,
    //AngularFireAuthModule,
    //AngularFireAnalyticsModule,
    //AngularFirePerformanceModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressBarModule,
    MatCardModule,
    MatSnackBarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    MatFileUploadModule,
    MatGridListModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    MaterialFileInputModule,
    MatBadgeModule,
    MatChipsModule,
    MatSidenavModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
