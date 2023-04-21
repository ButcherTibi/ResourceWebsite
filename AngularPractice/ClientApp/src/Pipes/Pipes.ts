import { Pipe, PipeTransform } from "@angular/core";
import { UntypedFormBuilder } from "@angular/forms";

@Pipe({ name: 'largeNum' })
export class LargeNumber implements PipeTransform {
    transform(value: number): string {
        return Intl.NumberFormat().format(Math.round(value))
    }
}

@Pipe({ name: 'when' })
export class When implements PipeTransform {
    transform(date_str: Date): string {
        let date = new Date(date_str)
        let parts = Intl.DateTimeFormat(undefined, {
            day: 'numeric',
            month: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            hour12: false,
            minute: '2-digit'
        }).formatToParts(date)

        let day = parts[2].value
        let month = parts[0].value
        let year = parts[4].value
        let hour = parts[6].value
        let minute = parts[8].value
        return `${day}.${month}.${year} ${hour}:${minute}`
    }
}