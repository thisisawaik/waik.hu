import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ShareService } from './services/share.service';
@Injectable({
  providedIn: 'root'
})
export class LoadGuardGuard implements CanLoad {
  constructor(private share: ShareService) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.share.getShareTags(route.path?.split('share/')[1])
    return false;
  }
}
