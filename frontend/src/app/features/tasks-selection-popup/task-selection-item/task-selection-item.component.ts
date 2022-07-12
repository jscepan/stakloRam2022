import { Component, Input, OnInit } from '@angular/core';
import { SelectionItem } from './task-selection-item.interface';

@Component({
  selector: 'app-task-selection-item',
  templateUrl: './task-selection-item.component.html',
  styleUrls: ['./task-selection-item.component.scss'],
  providers: [],
})
export class TaskSelectionItemComponent implements OnInit {
  @Input() dataModel!: SelectionItem;

  constructor() {}

  ngOnInit(): void {}
}
