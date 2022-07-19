import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/language.service';

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.scss'],
  providers: [],
})
export class PrintLayoutComponent implements OnInit, OnDestroy {
  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
