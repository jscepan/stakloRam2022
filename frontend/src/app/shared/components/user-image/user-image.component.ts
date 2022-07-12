import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.scss'],
})
export class UserImageComponent {
  @Input() type: 'placeholder' | 'avatar' = 'placeholder';
  @Input() size: 'large' | 'medium' | 'small' | 'extra-small' = 'medium';
  @Input() shape: 'squared' | 'rounded' | 'circled' = 'rounded';
  @Input() imageUrl: string = '';
  @Input() alt: string = '';

  constructor() {}
}
