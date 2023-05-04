import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import Globals from "src/Services/Globals";

@Injectable({
	providedIn: 'root'
})
export class EditImageGuard implements CanActivate {
	constructor(private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {		
		if (Globals.token !== '') {
			return true
		}
		
		Globals.return_url = state.url
		this.router.navigate(['/signin'])
		return false
	}
}