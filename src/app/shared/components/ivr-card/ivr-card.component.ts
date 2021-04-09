import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ivr-card',
  templateUrl: './ivr-card.component.html',
  styleUrls: ['./ivr-card.component.scss']
})
export class IvrCardComponent implements OnInit {
  @Input() ititle: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
