import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserImageModule } from '../user-image/user-image.module';
import { TranslateModule } from '@ngx-translate/core';
import { UserCardComponent } from './user-card.component';
import { UserInitialsModule } from '../user-initials/user-initials.module';

@NgModule({
  declarations: [UserCardComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    UserImageModule,
    UserInitialsModule,
    // TranslateModule,
  ],
  exports: [UserCardComponent],
})
export class UserCardModule {}
