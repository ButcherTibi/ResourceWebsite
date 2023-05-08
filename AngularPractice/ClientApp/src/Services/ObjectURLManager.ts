import { Injectable, OnDestroy } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Injectable({ providedIn: 'root' })
export class ObjectURLManager implements OnDestroy {
    urls: string[] = []

    constructor(private sanitizer: DomSanitizer) {}

    createUrl(buffer: ArrayBuffer): SafeUrl {
        let blob = new Blob([buffer])
        let new_url = URL.createObjectURL(blob)
        this.urls.push(new_url)

        return this.sanitizer.bypassSecurityTrustUrl(new_url)
    }

	createUrlFromBlob(blob: Blob): SafeUrl {
		let new_url = URL.createObjectURL(blob)
        this.urls.push(new_url)

        return this.sanitizer.bypassSecurityTrustUrl(new_url)
	}

    ngOnDestroy(): void {
        this.urls.forEach(url => {
            URL.revokeObjectURL(url)
        })
    }
}
