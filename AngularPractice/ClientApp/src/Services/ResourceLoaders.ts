import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

export enum ResourceType {
	Image,
	Audio
}

export class GetImageFileRequest {
	resource_id: number = 0
}

export class GetImageDetailsResponse {
	resource_id: number = 0
	title: string = ''
	create_date: Date = new Date()
	description: string = ''

	views: number = 0
	likes: number = 0
	dislikes: number = 0

	author_id: number = 0
	author_name: string = ''
	subscriptions: number = 0
}

export class GetResourceRecomendationsRequest {
	resource_id: number = 0
	type: ResourceType = ResourceType.Image
}

export class Recomendation {
	resource_id: number = 0
	title: string = ''
	author: string = ''
	views: number = 0
	create_date: Date = new Date
}

export class GetPreviewImageRequest {
	resource_id: number = 0
}

interface GetResourceRecomendationsResponse {
	recomendations: Recomendation[]
}

@Injectable({
	providedIn: 'root'
})
export class ResourceLoader {
	constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

	getImageFile(req: GetImageFileRequest, callback: (buffer: ArrayBuffer) => void) {
		this.http.post("api/getImageFile", req, { 
			responseType: "arraybuffer"
		}).subscribe(
			res => {
				callback(res);
			}
		);
	}

	getImageDetails(req: GetImageFileRequest, callback: (image_details: GetImageDetailsResponse) => void) {
		this.http.post<GetImageDetailsResponse>("api/getImageDetails", req).subscribe(
			callback
		)
	}

	getPreviewImage(req: GetPreviewImageRequest, onLoad: (bufer: ArrayBuffer) => void)
	{
		let obs = this.http.post("api/getPreviewImage", req, { responseType: 'arraybuffer' })
		obs.subscribe(
			res => {
				onLoad(res)
			}
		)
	}

	getResourceRecomendations(req: GetResourceRecomendationsRequest,
		onRecomendationsLoaded: (recomendations: Recomendation[]) => void,
		onPreviewFileLoaded: (resource_id: number, buffer: ArrayBuffer) => void)
	{
		this.http.post<GetResourceRecomendationsResponse>("api/getResourceRecomendations", req).subscribe(
			res => {
				onRecomendationsLoaded(res.recomendations)

				res.recomendations.forEach(recomendation => {
					let preview_req = {
						resource_id: recomendation.resource_id,
						type: ResourceType.Image
					}
					let obs = this.http.post("api/getPreviewImage", preview_req, { responseType: 'arraybuffer' })
					obs.subscribe(
						res => {
							onPreviewFileLoaded(recomendation.resource_id, res)
						}
					)
				})
			}
		)
	}
}