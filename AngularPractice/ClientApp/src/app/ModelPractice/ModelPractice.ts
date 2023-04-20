import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

class FormData {
    text = 'text field'
    num = 0
}

@Component({
    templateUrl: './model-practice.html'
})
export class ModelPractice {
    text_var = 'Text variable'

    constructor(private http: HttpClient) {}

    form_data = new FormGroup({
        "text_field": new FormControl("", Validators.required),
        'num_field': new FormControl('', Validators.required)
    })

    submit(form_data: FormGroup) {
        console.log(form_data)
        form_data.setValue({text_field: 'new value', num_field: 1234})

        this.http.get('weatherforecast').subscribe(() => {
            
        })
    }
}