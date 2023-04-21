import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

export class GetImageFileRequest {

}

export class GetImageDetailsResponse {
    title: string = ''
    create_date: Date = new Date()
    description: string = ''

    views: number = 0
    likes: number = 0
    dislikes: number = 0

    author_name: string = ''
    subscriptions: number = 0
}

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

@Injectable({
    providedIn: 'root'
})
export class ResourceLoader {
    constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

    getImageFile(req: GetImageFileRequest, callback: (allocated_url: string, safeurl: SafeUrl) => void) {
        this.http.post("api/getImageFile", req, { 
            responseType: "arraybuffer",
            observe: 'response'
        }).subscribe(
            res => {
                let blob = new Blob([res.body!])
                let url = URL.createObjectURL(blob)
                callback(
                    url,
                    this.sanitizer.bypassSecurityTrustUrl(url)
                );
            }
        );
    }

    getImageDetails(req: GetImageFileRequest, callback: (image_details: GetImageDetailsResponse) => void) {
        this.http.post<GetImageDetailsResponse>("api/getImageDetails", req).subscribe(
            callback
        )
    }

    getResourceComments(req: GetCommentsRequest, callback: (comments: Comment[]) => void) {
        this.http.post<GetResourceCommentsResponse>("api/getResourceComments", req).subscribe(
            res => {
                callback(res.comments)
            }
        )
    }
}