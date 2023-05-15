import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
	selector: 'edit-channel-page',
	templateUrl: 'EditChannelPage.html',
	styleUrls: ['EditChannelPage.scss']
})
export class EditChannelPage {
	banner_buffer = new ArrayBuffer(0)
	banner_ext = ''

	form = new FormGroup({		
	})

	onBannerUpload(ev: {buffer: ArrayBuffer, extension: string}) {
		this.banner_buffer = ev.buffer
		this.banner_ext = ev.extension
	}

	save() {
		
	}
}