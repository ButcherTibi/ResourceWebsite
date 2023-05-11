export default class Globals {
	static get user_name(): string {
		return sessionStorage.getItem('user_name') ?? ''
	}

	static get token(): string {
		return sessionStorage.getItem('auth_token') ?? ''
	}

	static signin(new_token: string, new_user_name: string) {
		sessionStorage.setItem('auth_token', new_token)
		sessionStorage.setItem('user_name', new_user_name)
	}

	static signout() {
		sessionStorage.removeItem('auth_token')
		sessionStorage.removeItem('user_name')
	}

	static channel_user_id?: number
}