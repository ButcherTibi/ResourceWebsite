import { Component, OnInit } from "@angular/core";
import Globals from "src/Services/Globals";

enum Popups {
	None,
	CreateAccount,
	Login
}

@Component({
    selector: 'page-wrapper',
    templateUrl: 'PageWrapper.html',
    styleUrls: ['PageWrapper.scss']
})
export class PageWrapper<ChildT> implements OnInit {
    popups = Popups
	active_popup = Popups.Login

    ngOnInit(): void {
        
    }

	onLogin() {
		this.active_popup = Popups.None
	}
}