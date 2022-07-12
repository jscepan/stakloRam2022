import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchInputComponent } from './search-input.component';
import { IconsModule } from '../../modules/icons/icons.module';

@NgModule({
  declarations: [SearchInputComponent],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    IconsModule,
  ],
  exports: [SearchInputComponent],
})
export class SearchInputModule {}
