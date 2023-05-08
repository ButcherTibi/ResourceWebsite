export default class Globals {
	static return_path: string = ''

	static get token(): string {
		return sessionStorage.getItem('auth_token') ?? ''
	}

	static set token(new_token: string) {
		sessionStorage.setItem('auth_token', new_token)
	}
}