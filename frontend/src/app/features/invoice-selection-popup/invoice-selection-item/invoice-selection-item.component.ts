import { Component, Input, OnInit } from '@angular/core';
import { SelectionItem } from './invoice-selection-item.interface';

@Component({
  selector: 'app-invoice-selection-item',
  templateUrl: './invoice-selection-item.component.html',
  styleUrls: ['./invoice-selection-item.component.scss'],
  providers: [],
})
export class InvoiceSelectionItemComponent implements OnInit {
  @Input() dataModel!: SelectionItem;

  constructor() {}

  ngOnInit(): void {}
}
