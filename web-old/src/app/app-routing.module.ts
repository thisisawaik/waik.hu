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
import { LoadGuard } from './load.guard';
import { FanartsComponent } from './fanarts/fanarts.component';
import { AccountComponent } from './account/account.component';
import { AuthComponent } from './auth/auth.component';
import { DiscordComponent } from './auth/discord/discord.component';
import { AdminComponent } from './admin/admin.component';
import { GeiszlaComponent } from './profiles/geiszla/geiszla.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'stream', component: StreamsComponent },
  { path: 'streams', component: StreamsComponent },
  { path: 'profile', component: ProfilesComponent },
  { path: 'profile/isti', component: IstiComponent },
  { path: 'profile/norticus', component: NorticusComponent },
  { path: 'profile/walrusz', component: WalruszComponent },
  { path: 'profile/geiszla', component: GeiszlaComponent },
  { path: 'download', component: DownloadsComponent },
  { path: 'downloads', component: DownloadsComponent },
  { path: 'share/:ShareId', component: ShareComponent },
  { path: 'fanart', component: FanartsComponent},
  { path: 'fanarts', component: FanartsComponent},
  { path: 'callback', component: AuthComponent },
  { path: 'callback/discord', component: DiscordComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
