import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ResourceLoader, ResourceType } from "src/Services/ResourceLoaders";
import { ObjectURLManager } from "src/Services/ObjectURLManager"
import { SafeUrl } from "@angular/platform-browser";

class Preview {
	resource_id: number = 0
	title: string = ''
	create_date: Date = new Date
	safeurl: SafeUrl = ''
}

@Component({
	selector: 'channel-page',
	templateUrl: 'ChannelPage.html',
	styleUrls: ['ChannelPage.scss']
})
export class ChannelPage implements OnInit {
	owner_name: string = ''
	description: string = ''
	resources: Preview[] = []

	constructor(
		private http: HttpClient,
		private res_loader: ResourceLoader,
		private objurl_manag: ObjectURLManager
	) {}

	ngOnInit(): void {
		let params = new URLSearchParams(window.location.search)
		
		let user_id: number = Number(params.get("user_id"));

		this.http.post("api/getChannelDetails", { user_id: user_id}).subscribe(
			(res: any) => {
				this.owner_name = res.owner_name
				this.description = res.description
				this.resources = res.resources

				this.resources.forEach(resource => {
					this.res_loader.getPreviewImage({ resource_id: resource.resource_id }, 
						(buffer) => {
							resource.safeurl = this.objurl_manag.createUrl(buffer)
						}
					)
				})
			}
		)
	}
}