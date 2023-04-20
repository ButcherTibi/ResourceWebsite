import { Component, OnInit, OnChanges, SimpleChanges, Input } from "@angular/core";

@Component({
    selector: 'hooks-practice',
    templateUrl: './hooks-practice.html'
})
export class HooksPractice implements OnInit {
    initialized_string: string | undefined

    ngOnInit(): void {
        this.initialized_string = 'string variable was initialized'
    }
}


@Component({
    selector: 'hooks-child',
    templateUrl: './hooks-child.html'
})
export class HooksChild implements OnChanges {
    @Input() prop: string | undefined

    msg: string = ''
    
    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes)
        this.msg = `prev ${changes.prop.previousValue} next ${changes.prop.currentValue}`
    }
}