import { Component, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CheckPassword, CheckUsername } from "./Validators";
import { AccountAPI, CreateAccountRequest } from "src/Services/AccountAPI";

enum Mode {
	Signin,
	Signup
}

@Component({
    selector: 'authenticate-popup',
    templateUrl: 'Authenticate.html',
    styleUrls: [ 'Authenticate.scss' ]
})
export class AuthenticatePopup {
	@Output() onClose = new EventEmitter
	@Output() onDone = new EventEmitter

	// Types
	mode = Mode

	now_mode = Mode.Signin
	bad_login_credentials = false

	signin_form = new FormGroup({
		'now_name': new FormControl('', { validators: [ Validators.required ] }),
		'now_password': new FormControl('', { validators: [ Validators.required ] }),
	})

    signup_form = new FormGroup({
        'new_name': new FormControl('', {
			updateOn: 'blur',
			asyncValidators: [
				this.check_username.validate.bind(this.check_username)
			]
		}),
        'new_password': new FormControl('', {
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
	) {}



	close() {
		this.onClose.emit()
	}

	switchMode(new_mode: Mode) {
		this.now_mode = new_mode
	}

	signin() {
		this.account_api.signin({
			name: this.signin_form.value.now_name!,
			password: this.signin_form.value.now_password!
		}, (ok) => {
			if (ok) {
				this.bad_login_credentials = false
				this.onDone.emit()
			}
			else {
				this.bad_login_credentials = true
			}
		})
	}

    signup() {
		this.account_api.createAccount({
			name: this.signup_form.value.new_name!,
			password: this.signup_form.value.new_password!,
		}, () => {
			this.onDone.emit()
		})
    }
}