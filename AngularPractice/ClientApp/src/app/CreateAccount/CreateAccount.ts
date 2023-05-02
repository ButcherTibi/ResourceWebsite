import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CheckPassword, CheckUsername } from "./Validators";
import { AccountAPI, CreateAccountRequest } from "src/Services/AccountAPI";

@Component({
    selector: 'create-account-popup',
    templateUrl: 'CreateAccount.html',
    styleUrls: [ 'CreateAccount.scss' ]
})
export class CreateAccount {
    form = new FormGroup({
        'name': new FormControl('', {
			updateOn: 'blur',
			asyncValidators: [
				this.check_username.validate.bind(this.check_username)
			]
		}),
        'password': new FormControl('', {
			updateOn: 'blur',
			asyncValidators: [
				this.check_password.validate.bind(this.check_password)
			]
		})
    })

	constructor(
		private account_api: AccountAPI,
		private check_username: CheckUsername,
		private check_password: CheckPassword
	){}

    signup() {
		let req: CreateAccountRequest = {
			name: this.form.value.name!,
			password: this.form.value.password!,

		}
		this.account_api.createAccount(req, () => {})
    }
}