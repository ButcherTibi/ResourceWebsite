import { Component } from "@angular/core";

enum States {
    Online,
    Offline,
    Error
}

@Component({
    templateUrl: './directives-practice.html'
})
export class DirectivesPractice {
    bool_var = true
    states = States
    state = States.Online
    items = [
        'One', 'Two', 'Three', 'Four'
    ]

    toggleBoolVar() {
        this.bool_var = !this.bool_var
    }
}