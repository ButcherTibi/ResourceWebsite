import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { ResourceLoader, GetImageDetailsResponse, Recomendation, ResourceType } from "src/Services/ResourceLoaders";
import { ObjectURLManager } from "src/Services/ObjectURLManager"
import { CommentAPI, Comment } from "src/Services/CommentsAPI";


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
		private comments_api: CommentAPI,
		private objurl_manag: ObjectURLManager
	) {}

	ngOnInit(): void {
		let search_params = new URLSearchParams(window.location.search)
		let resource_id: number = Number(search_params.get("id"))

		this.res_loader.getImageFile({ resource_id: resource_id }, (buffer) => {
			this.image_safeurl = this.objurl_manag.createUrl(buffer)
		})

		this.res_loader.getImageDetails({ resource_id: resource_id }, (image_details) => {
			this.image_details = image_details
		})

		this.comments_api.getResourceComments({ resource_id: resource_id, resource_type: ResourceType.Image, parent_comment_id: 0 }, (comments) => {
			this.comments = comments
		})

		this.res_loader.getResourceRecomendations({ resource_id: resource_id, type: ResourceType.Image }, 
			(recomendations) => {
				this.recomendations = recomendations.map(recomendation => {
					let new_recomendation_view: RecomendationView = {
						...recomendation,
						preview_safeurl: ''
					}
					return new_recomendation_view
				})
			},
			(id, buffer) => {
				let recomendation = this.recomendations.find(recomendation => recomendation.resource_id === id && recomendation.preview_safeurl === '')!
				recomendation.preview_safeurl = this.objurl_manag.createUrl(buffer)
			}
		)
	}

	addComment() {
		this.comments_api.addComment({
			resource_id: 0,
			author_id: 0,
			parent_comment_id: 0,

			comment_text: ''
		})
	}

	ngOnDestroy(): void {
		
	}
}