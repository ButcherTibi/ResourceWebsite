import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { SafeUrl } from "@angular/platform-browser";
import { ObjectURLManager } from "src/Services/ObjectURLManager";

@Component({
	selector: 'image-input',
	templateUrl: 'ImageInput.html',
	styleUrls: ['ImageInput.scss']
})
export class ImageInput implements OnInit, OnChanges {
	@Input() unique_id?: string
	@Input() text = 'Upload image'
	@Input() max_file_size_bytes: number = 10_000_000
	
	@Input() buffer: ArrayBuffer = new ArrayBuffer(0)
	@Output() onLoad = new EventEmitter<{buffer: ArrayBuffer, extension: string}>()

	file_name = ''
	file_extension = ''
	img_blob?: Blob
	img_safeurl?: SafeUrl


	constructor(
		private objurl_manag: ObjectURLManager
	) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['buffer'] !== undefined &&
			changes['buffer'].previousValue !== changes['buffer'].currentValue)
		{

			let buffer: ArrayBuffer = changes['buffer'].currentValue

			if (buffer.byteLength > 0) {
				this.img_blob = new Blob([buffer])
				this.img_safeurl = this.objurl_manag.createUrlFromBlob(this.img_blob)
			}
		}
	}

	ngOnInit(): void {
		if (this.unique_id === undefined) {
			console.error('unique_id input property must be specified')
		}
	}

	onChange(ev: Event) {
		let file_input = ev.target as HTMLInputElement
		let file: File = file_input.files?.item(0)!

		if (file.size > this.max_file_size_bytes) {
			console.error('File too large')
			return
		}

		file.arrayBuffer().then(
			buffer => {
				let dot_pos = file.name.lastIndexOf('.')
				this.file_name = file.name.substring(0, dot_pos)
				this.file_extension = file.name.substring(dot_pos + 1)

				this.img_blob = new Blob([buffer])
				this.img_safeurl = this.objurl_manag.createUrlFromBlob(this.img_blob)

				this.onLoad.emit({
					buffer: buffer,
					extension: this.file_extension
				})
			},
			err => console.error(err)
		)
	}
}