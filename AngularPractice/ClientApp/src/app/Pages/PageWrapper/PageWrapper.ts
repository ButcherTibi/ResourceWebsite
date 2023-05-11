import { Component, OnInit } from "@angular/core";
import { AccountAPI } from "src/Services/AccountAPI";
import Globals from "src/Services/Globals";

enum Popups {
	None,
	Signup
}

enum Dropdowns {
	None,
	Account
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
    // Types
	popups = Popups
	dropdown = Dropdowns
	inner_content = InnerContent

	now_popup = Popups.None
	now_dropdown = Dropdowns.None
	now_content = InnerContent.Image
	user_name = ''
	is_logged_in = false


	constructor(
		private account_api: AccountAPI
	) {}

	reloadUserDetails() {
		if (Globals.token === '') {
			this.user_name = 'Anonymous'
			this.is_logged_in = false
		}
		else {
			this.user_name = Globals.user_name
			this.is_logged_in = true
		}
	}

    ngOnInit(): void {
		// Top bar
		this.reloadUserDetails()

		// Content
		let path = window.location.pathname
		if (path.startsWith('/image')) {
			this.now_content = InnerContent.Image
		}
		else if (path.startsWith('/channel')) {
			this.now_content = InnerContent.Channel
		}
		else {
			throw new Error(`Unrecognized path = ${path}`)
		}
    }

	onAccountBtnClick() {
		if (this.is_logged_in === false) { 
			this.now_popup = Popups.Signup
		}
		else {
			this.now_dropdown = Dropdowns.Account
		}
	}

	closePopups() {
		this.now_popup = Popups.None
	}

	closeDropdowns() {
		this.now_dropdown = Dropdowns.None
	}

	onAuthenticated() {
		this.closePopups()
		this.reloadUserDetails()
	}

	editAccount() {
		this.closeDropdowns();
	}

	signOut() {
		Globals.signout();
		this.reloadUserDetails();
		this.closeDropdowns();
	}
}