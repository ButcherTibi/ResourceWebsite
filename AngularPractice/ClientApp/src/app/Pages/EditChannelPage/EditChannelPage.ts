import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
	selector: 'edit-channel-page',
	templateUrl: 'EditChannelPage.html',
	styleUrls: ['EditChannelPage.scss']
})
export class EditChannelPage {

	form = new FormGroup({
		'banner_image': new FormControl(),
		
	})
}