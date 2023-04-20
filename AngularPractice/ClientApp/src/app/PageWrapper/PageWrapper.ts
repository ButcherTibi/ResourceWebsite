import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'page-wrapper',
    templateUrl: 'PageWrapper.html',
    styleUrls: ['PageWrapper.scss']
})
export class PageWrapper<ChildT> implements OnInit {
    

    ngOnInit(): void {
        
    }
}