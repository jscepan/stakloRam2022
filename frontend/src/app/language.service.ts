import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  static defaultLanguage = 'sr';
  public supportedLanguages = ['en', 'sr'];

  public selectedLanguage!: string;

  constructor(
    private translateService: TranslateService,
    private titleService: Title
  ) {
    let selectedLanguage = localStorage.getItem('language');
    if (!selectedLanguage) {
      selectedLanguage = LanguageService.defaultLanguage;
    }
    this.changeLanguage(selectedLanguage);
  }

  changeLanguage(languageCode: string): void {
    this.selectedLanguage = languageCode;
    this.translateService.use(languageCode);
    localStorage.setItem('language', languageCode);

    this.setBrowserTitle();
  }

  private setBrowserTitle(): void {
    // TODO 'browserTitle' is fixed for all pages, make this dynamic for SEO purposes
    this.translateService.get('browserTitle').subscribe((title: string) => {
      this.titleService.setTitle(title);
    });
  }
}
