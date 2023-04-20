import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { ResourceLoader, Comment, GetImageDetailsResponse } from "src/Services/ResourceLoaders";


@Component({
    selector: 'image-page',
    templateUrl: 'ImagePage.html',
    styleUrls: ['ImagePage.scss']
})
export class ImagePage implements OnInit, OnDestroy {
    image_url = ''
    image_safeurl: SafeUrl = ''

    image_details: GetImageDetailsResponse = new GetImageDetailsResponse
    comments: Comment[] = []
    

    constructor(private http: HttpClient, private sanitizer: DomSanitizer, private res_loader: ResourceLoader) {}

    ngOnInit(): void {
        this.res_loader.getImageFile({ id: 1 }, (url, safeurl) => {
            this.image_url = url
            this.image_safeurl = safeurl
        })

        this.res_loader.getImageDetails({ id: 1 }, (image_details) => {
            this.image_details = image_details
        })

        this.res_loader.getResourceComments({ id: 1 }, (comments) => {
            this.comments = comments
        })
    }

    ngOnDestroy(): void {
        URL.revokeObjectURL(this.image_url)
    }
}