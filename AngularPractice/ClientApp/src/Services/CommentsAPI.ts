import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import Globals from "./Globals";

export class GetCommentsRequest {
	id: number = 0
}

export class Comment {
	id: number = 0
	parent_id: number = 0
	level: number = 0
	user_name: string = ''
	updated_date: Date = new Date
	text: string = ''
	likes: number = 0
	dislikes: number = 0
}

interface GetResourceCommentsResponse {
	comments: Comment[]
}

export class AddCommentRequest {
	resource_id: number = 0
	author_id: number = 0
	parent_comment_id: number = 0

	comment_text: string = ''
}

@Injectable({
	providedIn: 'root'
})
export class CommentAPI {
	constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

	getResourceComments(req: GetCommentsRequest, callback: (comments: Comment[]) => void) {
		this.http.post<GetResourceCommentsResponse>("api/getResourceComments", req).subscribe(
			res => {
				callback(res.comments)
			}
		)
	}

	addComment(req: AddCommentRequest) {
		let headers = new HttpHeaders;
		headers = headers.append('Authorization', `Bearer ${Globals.token}`)

		this.http.post('api/addComment', req, {
			headers: headers
		}).subscribe(
			() => {}
		)
	}
}