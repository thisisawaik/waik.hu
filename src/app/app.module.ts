import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { IstiComponent } from './profiles/isti/isti.component';
import { NorticusComponent } from './profiles/norticus/norticus.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { WalruszComponent } from './profiles/walrusz/walrusz.component';
import { StreamsComponent } from './streams/streams.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { DiscordEmbedComponent } from './discord-embed/discord-embed.component'
import { DownloadsComponent } from './downloads/downloads.component';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from './downloads/card/card.component';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StreamsComponent,
    ProfilesComponent,
    IstiComponent,
    NorticusComponent,
    WalruszComponent,
    DiscordEmbedComponent,
    DownloadsComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatGridListModule,
    MatButtonModule,
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
