import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryCreateEditComponent } from './country-create-edit.component';
import { TranslateModule } from '@ngx-translate/core';
import { IconsModule } from 'src/app/shared/modules/icons/icons.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ButtonModule } from 'src/app/shared/components/button/button.module';

@NgModule({
    declarations: [CountryCreateEditComponent],
    imports: [
        CommonModule,
        TranslateModule,
        IconsModule,
        ButtonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
    ]
})
export class CountryCreateEditModule {}
