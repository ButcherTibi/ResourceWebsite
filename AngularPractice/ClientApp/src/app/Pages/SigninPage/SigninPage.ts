import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AccountAPI } from "src/Services/AccountAPI";
import Globals from "src/Services/Globals";

@Component({
	selector: 'signin-page',
	templateUrl: 'SigninPage.html',
	styleUrls: ['SigninPage.scss']
})
export class SigninPage {
	name: string = ''
	password: string  = ''

	constructor(
		private account_api: AccountAPI,
		private router: Router
	) {}

	signin() {
		this.account_api.signin({ name: this.name, password: this.password},
			(ok) => {
				if (ok) {
					// TODO: navigate to last url not signup in history
					
				}
			}	
		)
	}
}