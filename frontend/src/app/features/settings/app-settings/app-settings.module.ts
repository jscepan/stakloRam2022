import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSettingsRoutingModule } from './app-settings-routing.module';
import { AppSettingsComponent } from './app-settings.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NumberDecimalModule } from 'src/app/shared/directives/number-decimal/number-decimal.module';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [AppSettingsComponent],
  imports: [
    CommonModule,
    AppSettingsRoutingModule,
    TranslateModule,
    ButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    NumberDecimalModule,
    MatSelectModule,
    MatExpansionModule,
  ],
})
export class AppSettingsModule {}
