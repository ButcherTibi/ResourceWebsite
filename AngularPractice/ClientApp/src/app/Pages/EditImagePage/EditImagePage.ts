import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { SafeUrl } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ChannelAPI } from "src/Services/ChannelAPI";
import { ObjectURLManager } from "src/Services/ObjectURLManager";
import { ResourceLoader } from "src/Services/ResourceLoaders";

@Component({
	selector: 'edit-image-page',
	templateUrl: 'EditImagePage.html',
	styleUrls: ['EditImagePage.scss']
})
export class EditImagePage implements OnInit {
	resource_blob?: Blob
	resource_safeurl: SafeUrl = ''
	preview_blob?: Blob
	preview_safeurl: SafeUrl = ''
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
		private router: Router
	) {}

	ngOnInit(): void {
		let path = window.location.pathname.split('/')[1]
		
		switch (path) {
			case 'addimage': {
				break;
			}
			case 'editimage': {
				let params = new URLSearchParams(window.location.search)
				let id = params.get('id')
				if (id === null) {
					this.router.navigate(['addimage'])
				}

				this.resource_id = Number.parseInt(id!);

				this.res_loader.getImageFile({ resource_id: this.resource_id },
				buffer => {
					this.resource_blob = new Blob([buffer])
					this.resource_safeurl = this.objurl_manag.createUrlFromBlob(this.resource_blob)
				})

				this.res_loader.getPreviewImage({ resource_id: this.resource_id },
				buffer => {
					this.preview_blob = new Blob([buffer])
					this.preview_safeurl = this.objurl_manag.createUrlFromBlob(this.preview_blob)
				})
				
				this.res_loader.getImageDetails({ resource_id: this.resource_id },
				res => {
					this.form.controls['title'].setValue(res.title)
					this.form.controls['description'].setValue(res.description)
				})
				break;
			}
			default: console.trace()
		}
	}

	resourceFileChange(f: Event) {
		let elem = f.target as HTMLInputElement;
		let file: File = elem.files!.item(0)!
		file.arrayBuffer().then(
			buff => {
				this.resource_blob = new Blob([buff], {
					type: file.type
				})
				this.resource_safeurl = this.objurl_manag.createUrlFromBlob(this.resource_blob)
			}
		)
	}

	previewFileChange(f: Event) {
		let elem = f.target as HTMLInputElement;
		let file: File = elem.files!.item(0)!
		file.arrayBuffer().then(
			buff => {
				this.preview_blob = new Blob([buff], {
					type: file.type
				})
				this.preview_safeurl = this.objurl_manag.createUrlFromBlob(this.preview_blob)
			}
		)
	}

	save() {
		this.channel_api.upsertResourceFile({
			resource_id: this.resource_id,
			title: this.form.value.title!,
			description: this.form.value.description!,
			resource_blob: this.resource_blob!,
			preview_blob: this.preview_blob!,
		},
			() => {
				
			},
			err => {
				console.log(err)
			}
		)
	}
}