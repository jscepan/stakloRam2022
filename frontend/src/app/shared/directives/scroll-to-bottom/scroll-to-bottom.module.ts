import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToBottomDirective } from './scroll-to-bottom.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ScrollToBottomDirective],
  exports: [ScrollToBottomDirective],
})
export class ScrollToBottomModule {}
