import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    templateUrl: './DataBindingParent.html'
})
export class DataBindingParent {
    data_from_child: string = ''

    twoway_data: string = ''

    onChildClick(received_data: string) {
        this.data_from_child = received_data
    }

    changeTwowayData(new_data: string) {
        this.twoway_data = new_data
    }
}


@Component({
    selector: 'downward-child',
    templateUrl: './downward-child.html'
})
export class DownwardChild {
    @Input() prop: string = 'no data from parent'
}


@Component({
    selector: 'upward-child',
    templateUrl: './upward-child.html'
})
export class UpwardChild {
    @Output() prop = new EventEmitter<string>()

    onClick(data: string) {
        this.prop.emit(data)
    }
}


@Component({
    selector: 'twoway-child',
    templateUrl: './twoway-child.html'
})
export class TwowayChild {
    @Input() data: string | undefined
    @Output() dataChange = new EventEmitter<string>()

    changeData(new_data: string) {
        this.data = new_data
        this.dataChange.emit(new_data)
    }
}