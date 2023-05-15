import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { SafeUrl } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ChannelAPI } from "src/Services/ChannelAPI";
import Globals from "src/Services/Globals";
import { ObjectURLManager } from "src/Services/ObjectURLManager";
import { ResourceLoader } from "src/Services/ResourceLoaders";

@Component({
	selector: 'edit-image-page',
	templateUrl: 'EditImagePage.html',
	styleUrls: ['EditImagePage.scss']
})
export class EditImagePage implements OnInit {
	image_buffer = new ArrayBuffer(0)
	preview_buffer = new ArrayBuffer(0)

	resource_id?: number


	form = new FormGroup({
		'resource_file': new FormControl(),
		'preview_file': new FormControl(),
		'title': new FormControl(''),
		'description': new FormControl('')
	})

	constructor(
		private res_loader: ResourceLoader,
		private channel_api: ChannelAPI,
		private objurl_manag: ObjectURLManager,
		private router: Router,
		private activated_route: ActivatedRoute
	) {}

	ngOnInit(): void {
		switch (window.location.pathname) {
			case '/addimage': {
				break;
			}
			case '/editimage': {
				let params = new URLSearchParams(window.location.search)
				let id = params.get('resource_id')
				if (id === null) {
					this.router.navigate(['addimage'])
				}

				this.resource_id = Number.parseInt(id!);

				this.res_loader.getImageFile({ resource_id: this.resource_id },
				buffer => {
					this.image_buffer = buffer
				})

				this.res_loader.getPreviewImage({ resource_id: this.resource_id },
				buffer => {
					this.preview_buffer = buffer
				})
				
				this.res_loader.getImageDetails({ resource_id: this.resource_id },
				res => {
					this.form.controls['title'].setValue(res.title)
					this.form.controls['description'].setValue(res.description)
				})
				break;
			}
			default: {
				this.activated_route.paramMap.subscribe({
					next: param_map =>{
						param_map.get('resource_id')
					}
				})
			}
		}
	}

	onImageLoad(ev: {buffer: ArrayBuffer, extension: string}) {
		this.image_buffer = ev.buffer
	}

	onPreviewLoad(ev: {buffer: ArrayBuffer, extension: string}) {
		this.preview_buffer = ev.buffer
	}

	save() {
		this.channel_api.upsertResourceFile({
			resource_id: this.resource_id,
			title: this.form.value.title!,
			description: this.form.value.description!,
			resource_blob: new Blob([this.image_buffer]),
			preview_blob: new Blob([this.preview_buffer]),
		},
			() => {
				this.router.navigateByUrl(`/channel?user_id=${Globals.channel_user_id}`)
			},
			err => {
				console.log(err)
			}
		)
	}
}