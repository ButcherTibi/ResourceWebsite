import { Component, Input, AfterViewChecked } from "@angular/core";

@Component({
    selector: 'rating',
    templateUrl: 'Rating.html',
    styleUrls: ['Rating.scss']
})
export class Rating implements AfterViewChecked {
    @Input() likes = 0
    @Input() dislikes = 0
    @Input() unique_class = ''
    @Input() dimmed = false

    format(num: number): string {
        return Intl.NumberFormat().format(num)
    }

    updateBar() {
        let width_percent: number;

        if (this.likes === this.dislikes) {
            width_percent = 50
        }
        else if (this.likes === 0) {
            width_percent = 0
        }
        else if (this.dislikes === 0) {
            width_percent = 100
        }
        else {
            width_percent = this.likes / (this.likes + this.dislikes) * 100
        }

        let up: HTMLDivElement = document.querySelector(`.${this.unique_class} .up`)!
        up.style.width = `${width_percent}%`
    }

    getVersionClass() {
        if (this.dimmed) {
            return 'rating dimmed-version'
        }
        else {
            return 'rating normal-version'
        }
    }

    ngAfterViewChecked(): void {
        this.updateBar()
    }
}