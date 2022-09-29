import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitiesRoutingModule } from './users-routing.module';
import { UsersComponent as UsersComponent } from './users.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { MatDialogModule } from '@angular/material/dialog';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { UserCreateEditModule } from '@features/user-create-edit/user-create-edit.module';
import { ScrollToBottomModule } from 'src/app/shared/directives/scroll-to-bottom/scroll-to-bottom.module';
import { PasswordResetModule } from '@features/password-reset/password-reset.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    CitiesRoutingModule,
    TranslateModule,
    ButtonModule,
    MatDialogModule,
    SearchInputModule,
    UserCreateEditModule,
    ScrollToBottomModule,
    PasswordResetModule,
    MatProgressSpinnerModule,
  ],
})
export class UsersModule {}
