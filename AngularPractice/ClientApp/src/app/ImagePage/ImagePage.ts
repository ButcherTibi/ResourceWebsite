import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { ResourceLoader, Comment, GetImageDetailsResponse, Recomendation } from "src/Services/ResourceLoaders";
import { ObjectURLManager } from "src/Services/ObjectURLManager"


class RecomendationView extends Recomendation {
	preview_safeurl: SafeUrl = ''
}

@Component({
	selector: 'image-page',
	templateUrl: 'ImagePage.html',
	styleUrls: ['ImagePage.scss']
})
export class ImagePage implements OnInit, OnDestroy {
	image_safeurl: SafeUrl = ''

	image_details: GetImageDetailsResponse = new GetImageDetailsResponse
	comments: Comment[] = []
	recomendations: RecomendationView[] = []
	

	constructor(
		private http: HttpClient,
		private sanitizer: DomSanitizer,
		private res_loader: ResourceLoader,
		private objurl_manag: ObjectURLManager
	) {}

	ngOnInit(): void {
		this.res_loader.getImageFile({ id: 1 }, (buffer) => {
			this.image_safeurl = this.objurl_manag.createUrl(buffer)
		})

		this.res_loader.getImageDetails({ id: 1 }, (image_details) => {
			this.image_details = image_details
		})

		this.res_loader.getResourceComments({ id: 1 }, (comments) => {
			this.comments = comments
		})

		this.res_loader.getResourceRecomendations({ resource_id: 1 }, 
			(recomendations) => {
				this.recomendations = recomendations.map(recomendation => {
					let new_recomendation_view: RecomendationView = {
						...recomendation,
						preview_safeurl: ''
					}
					return new_recomendation_view
				})
			},
			(resource_id, buffer) => {
				let recomendation = this.recomendations.find(recomendation => recomendation.resource_id === resource_id)!
				recomendation.preview_safeurl = this.objurl_manag.createUrl(buffer)
			}
		)
	}

	ngOnDestroy(): void {
		
	}
}