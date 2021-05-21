import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadsComponent } from './downloads/downloads.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { IstiComponent } from './profiles/isti/isti.component';
import { NorticusComponent } from './profiles/norticus/norticus.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { WalruszComponent } from './profiles/walrusz/walrusz.component';
import { ShareComponent } from './share/share.component';
import { StreamsComponent } from './streams/streams.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'stream', component: StreamsComponent },
  { path: 'streams', component: StreamsComponent },
  { path: 'profile', component: ProfilesComponent, /*children: [
    { path: 'isti', component: IstiComponent },
    { path: 'norticus', component: NorticusComponent },
    { path: 'walrusz', component: WalruszComponent },
  ] */},
  { path: 'profile/isti', component: IstiComponent },
  { path: 'profile/norticus', component: NorticusComponent },
  { path: 'profile/walrusz', component: WalruszComponent },
  { path: 'download', component: DownloadsComponent },
  { path: 'downloads', component: DownloadsComponent },
  { path: 'share/:ShareId', component: ShareComponent },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
