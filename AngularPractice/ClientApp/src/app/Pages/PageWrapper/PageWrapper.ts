import { Component, OnInit } from "@angular/core";
import Globals from "src/Services/Globals";

enum Popups {
	None,
	CreateAccount,
	Login
}

enum InnerContent {
	Image,
	Channel
}

@Component({
    selector: 'page-wrapper',
    templateUrl: 'PageWrapper.html',
    styleUrls: ['PageWrapper.scss']
})
export class PageWrapper<ChildT> implements OnInit {
    popups = Popups
	active_popup = Popups.None
	inner_content = InnerContent
	active_content = InnerContent.Image

    ngOnInit(): void {
		let path = window.location.pathname
		if (path.startsWith('/image')) {
			this.active_content = InnerContent.Image
		}
		else if (path.startsWith('/channel')) {
			this.active_content = InnerContent.Channel
		}
    }

	onLogin() {
		this.active_popup = Popups.None
	}
}