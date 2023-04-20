import { Component, Input } from "@angular/core";

@Component({
    selector: 'rating',
    templateUrl: 'Rating.html',
    styleUrls: ['Rating.scss']
})
export class Rating {
    @Input() likes = 0
    @Input() dislikes = 0

    format(num: number): string {
        return Intl.NumberFormat().format(num)
    }
}