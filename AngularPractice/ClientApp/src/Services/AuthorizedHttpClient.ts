import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import Globals from "./Globals";
import { Router } from "@angular/router";
import { Observable, map, catchError, of, tap } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class AuthorizedHttpClient {
	constructor(
		private http: HttpClient,
		private router: Router
	) {}

	post<Response_T = any>(url: string, body: any)
	{
		let headers = new HttpHeaders;
		headers = headers.append('Authorization', `Bearer ${Globals.token}`)

		let obs = this.http.post<Response_T>(url, body, {
			headers: headers
		})

		return obs.pipe(
			tap({
				next: res => {
					return res
				},
				error: (err: HttpErrorResponse) => {
					if (err.status === 401) {
						this.router.navigate(['/signin'])
					}
				}
			})
		)
	}

	postRBlob(url: string, body: any)
		: Observable<Blob>
	{
		let headers = new HttpHeaders;
		headers = headers.append('Authorization', `Bearer ${Globals.token}`)

		let obs = this.http.post(url, body, {
			headers: headers,
			responseType: 'blob'
		})

		return obs.pipe(
			tap({
				next: res => {
					return res
				},
				error: (err: HttpErrorResponse) => {
					if (err.status === 401) {
						this.router.navigate(['/signin'])
					}
				}
			})
		)
	}
}