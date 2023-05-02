import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Globals from "./Globals";

export class CreateAccountRequest {
	name: string = ''
	password: string = ''
}

export class LoginRequest {
	name: string = ''
	password: string = ''
}

class LoginResponse {
	ok: boolean = false
	token: string = ''
}

@Injectable({
	providedIn: 'root'
})
export class AccountAPI {
	constructor(private http: HttpClient) {}

	createAccount(req: CreateAccountRequest, callback: () => void) {
		this.http.post('api/account/createAccount', req).subscribe(
			() => callback()
		)
	}

	login(req: LoginRequest, callback: (ok: boolean) => void) {
		this.http.post<LoginResponse>('api/account/login', req).subscribe(
			res => {
				if (res.ok) {
					Globals.token = res.token
				}

				callback(res.ok)
			}
		)
	}
}