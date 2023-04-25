import { Component, Input, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'recomendation',
  templateUrl: './recomendation.html',
  styleUrls: ['./recomendation.scss']
})
export class Recomendation implements OnInit {
  @Input() safeurl: SafeUrl = ''
  @Input() title: string = ''
  @Input() author: string = ''
  @Input() views: number = 0
  @Input() create_date: Date = new Date

  constructor() { }

  ngOnInit(): void {
  }

}
