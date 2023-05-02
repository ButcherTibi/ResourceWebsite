import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, map } from "rxjs";


interface CheckUsernameResponse {
	ok: string
	err_msg: string
}

@Injectable({ providedIn: 'root' })
export class CheckUsername implements AsyncValidator {
	constructor(private http: HttpClient) {}

	validate(control: AbstractControl<string, any>): Observable<ValidationErrors | null> {
		let req = {
			username: control.value
		}
		return this.http.post<CheckUsernameResponse>("api/account/checkUsername", req).pipe(
			map(project => project.ok ? null : { error: project.err_msg })
		)
	}
}

interface CheckPasswordResponse {
	ok: string
	err_msg: string
}

@Injectable({ providedIn: 'root' })
export class CheckPassword implements AsyncValidator {
	constructor(private http: HttpClient) {}
	
	validate(control: AbstractControl<string, any>): Observable<ValidationErrors | null> {
		let req = {
			password: control.value
		}
		return this.http.post<CheckPasswordResponse>("api/account/checkPassword", req).pipe(
			map(project => project.ok ? null : { error: project.err_msg })
		)
	}
}