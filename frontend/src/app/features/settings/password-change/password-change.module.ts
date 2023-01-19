import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IconsModule } from 'src/app/shared/modules/icons/icons.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { PasswordChangeComponent } from './password-change.component';
import { PasswordChangeRoutingModule } from './password-change-routing.module';

@NgModule({
    declarations: [PasswordChangeComponent],
    imports: [
        CommonModule,
        PasswordChangeRoutingModule,
        TranslateModule,
        IconsModule,
        ButtonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
    ]
})
export class PasswordChangeModule {}
