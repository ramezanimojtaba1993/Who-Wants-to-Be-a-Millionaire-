import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { StorageService } from './services/storage.service';

@Injectable()
export class CanActivateTeam implements CanActivate {
	constructor(private router: Router, private storageService: StorageService) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return new Observable<boolean>((observer) => {
			const token = this.storageService.getItem('token');

			if (!token) {
				this.router.navigate(['login']);
			}

			observer.next(true);
		});
	}
}
