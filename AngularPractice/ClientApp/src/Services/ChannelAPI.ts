import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import Globals from "./Globals";
import { ResourceType } from "./ResourceLoaders";
import { AuthorizedHttpClient } from "./AuthorizedHttpClient";
import { defer, forkJoin, from } from "rxjs";

export interface UpsertResourceFileRequest {
	resource_id?: number
	title: string
	description: string
	resource_blob: Blob
	preview_blob: Blob
}

interface UpsertResourceFileResponse {
	resource_id: number
}

@Injectable({
	providedIn: 'root'
})
export class ChannelAPI {
	constructor(
		private http: HttpClient,
		private auth_http: AuthorizedHttpClient,
		private sanitizer: DomSanitizer
	) {}

	upsertResourceFile(req: UpsertResourceFileRequest,
		onLoad: (resource_id: number) => void, onError: (err: any) => void)
	{
		let form_req = new FormData
		if (req.resource_id !== undefined) {
			form_req.append('resource_id', req.resource_id.toString())
		}
		form_req.append('title', req.title)
		form_req.append('description', req.description)
		form_req.append('resource_file', req.resource_blob)
		form_req.append('preview_file', req.preview_blob)

		this.auth_http.post<UpsertResourceFileResponse>('api/upsertResourceFile', form_req).subscribe({
			next: res => {
				onLoad(res.resource_id)
			},
			error: onError
		})
	}
}