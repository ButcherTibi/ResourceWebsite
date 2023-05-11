import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ResourceLoader, ResourceType } from "src/Services/ResourceLoaders";
import { ObjectURLManager } from "src/Services/ObjectURLManager"
import { SafeUrl } from "@angular/platform-browser";
import { Router } from "@angular/router";
import Globals from "src/Services/Globals";

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
	channel_user_id: number = 0
	owner_name: string = ''
	description: string = ''
	resources: Preview[] = []
	selected_resource_id?: number

	// Context menu
	show_resource_ctx_menu = false
	res_ctx_menu_x = 0
	res_ctx_menu_y = 0

	constructor(
		private http: HttpClient,
		private res_loader: ResourceLoader,
		private objurl_manag: ObjectURLManager,
		private router: Router
	) {}

	ngOnInit(): void {
		let params = new URLSearchParams(window.location.search)
		
		this.channel_user_id = Number(params.get("user_id"));

		this.http.post("api/getChannelDetails", { user_id: this.channel_user_id}).subscribe(
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

	addImageResource() {
		Globals.channel_user_id = this.channel_user_id
		this.router.navigate(['/addimage'])
	}

	editImageResource() {
		Globals.channel_user_id = this.channel_user_id
		this.router.navigateByUrl(`/editimage?resource_id=${this.selected_resource_id}`)
	}

	closeContexMenu() {
		this.selected_resource_id = undefined
		this.show_resource_ctx_menu = false
	}

	showContextMenu(ev: MouseEvent) {
		let target = ev.composedPath()[0] as HTMLButtonElement
		this.selected_resource_id = Number.parseInt((target.dataset as any)['resource_id'])
		
		let ctx_menu = document.getElementById('resource_ctx_menu') as HTMLDivElement
		let btn_rect = target.getBoundingClientRect()
		ctx_menu.style.top = `${btn_rect.bottom}px`
		ctx_menu.style.left = `${btn_rect.left}px`

		let ctx_rect = ctx_menu.getBoundingClientRect();
		if (ctx_rect.bottom > window.innerHeight) {
			ctx_menu.style.top = `${btn_rect.top - ctx_rect.height}px`
		}

		this.show_resource_ctx_menu = true
	}
}