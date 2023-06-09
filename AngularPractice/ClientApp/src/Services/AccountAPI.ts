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

interface LoginResponse {
	ok: boolean
	user_id: number
	user_name: string
	token: string
}

@Injectable({
	providedIn: 'root'
})
export class AccountAPI {
	constructor(private http: HttpClient) {}

	createAccount(req: CreateAccountRequest, callback: () => void) {
		this.http.post<LoginResponse>('api/account/createAccount', req).subscribe(
			(res) => {
				Globals.signin(res.token, res.user_name);
				callback()
			}
		)
	}

	signin(req: LoginRequest, callback: (ok: boolean) => void) {
		this.http.post<LoginResponse>('api/account/login', req).subscribe(
			res => {
				if (res.ok) {
					Globals.signin(res.token, res.user_name);
				}
				
				callback(res.ok)
			}
		)
	}
}