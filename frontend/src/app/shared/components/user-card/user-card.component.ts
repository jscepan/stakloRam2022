import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { getUserInitials } from '../../utils';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  userImageType: 'avatar' | 'initials' = 'initials';

  getUserInitials = getUserInitials;

  @Input() dataModel!: UserModel;
  @Input() showUserData: boolean = true;
  @Input() size: 'large' | 'medium' | 'small' | 'extra-small' = 'medium';
  @Input() shape: 'squared' | 'rounded' | 'circled' = 'rounded';

  constructor() {}

  ngOnInit(): void {
    this.userImageType = 'initials'; // this.dataModel.thumbnail ? 'avatar' : 'initials';
  }
}
