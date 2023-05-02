import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AccountAPI } from "src/Services/AccountAPI";

@Component({
	selector: 'login-popup',
	templateUrl: 'login.html',
	styleUrls: ['Login.scss']
})
export class Login {
	@Output() onLogin = new EventEmitter()

	form = new FormGroup({
		'name': new FormControl(''),
		'password': new FormControl('')
	})

	constructor(private account_api: AccountAPI) {}

	signin() {
		this.account_api.login({
			name: this.form.value.name!,
			password: this.form.value.password!
		}, (ok) => {
			if (ok) {
				this.onLogin.emit()
			}
		})
	}
}