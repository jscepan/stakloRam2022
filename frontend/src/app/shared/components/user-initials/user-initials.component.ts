import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-initials',
  templateUrl: './user-initials.component.html',
  styleUrls: ['./user-initials.component.scss'],
})
export class UserInitialsComponent implements OnInit {
  @Input() size: 'large' | 'medium' | 'small' | 'extra-small' = 'medium';
  @Input() shape: 'squared' | 'rounded' | 'circled' = 'rounded';
  @Input() initials: string = '';

  randomColor = ['primary', 'success', 'danger', 'warning', 'info'];
  randomItem = 0;

  constructor() {}

  ngOnInit(): void {
    this.randomItem = Math.floor(Math.random() * this.randomColor.length);
  }
}
