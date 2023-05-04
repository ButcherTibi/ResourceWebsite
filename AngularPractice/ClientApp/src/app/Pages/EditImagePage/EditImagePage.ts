import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
	selector: 'edit-image-page',
	templateUrl: 'EditImagePage.html',
	styleUrls: ['EditImagePage.scss']
})
export class EditImagePage {
	uploaded_file?: File

	form = new FormGroup({
		'file': new FormControl(''),
		'title': new FormControl(''),
	})

	fileChange(f: Event) {
		let elem = f.target as HTMLInputElement;
		let file: File = elem.files!.item(0)!
		this.uploaded_file = file
	}

	save() {
		console.log(this.form)
	}
}