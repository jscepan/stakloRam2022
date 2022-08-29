import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/language.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.scss'],
  providers: [],
})
export class PrintLayoutComponent implements OnInit, OnDestroy {
  public subs: SubscriptionManager = new SubscriptionManager();

  constructor(private LanguageService: LanguageService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
