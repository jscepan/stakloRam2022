import { Component, Input, OnInit } from '@angular/core';
import { WorkOrderSelectionItem } from './work-order-selection-item.interface';

@Component({
  selector: 'app-work-order-selection-item',
  templateUrl: './work-order-selection-item.component.html',
  styleUrls: ['./work-order-selection-item.component.scss'],
  providers: [],
})
export class WorkOrderSelectionItemComponent implements OnInit {
  @Input() dataModel!: WorkOrderSelectionItem;

  constructor() {}

  ngOnInit(): void {}
}
