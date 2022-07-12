import {
  OnInit,
  OnChanges,
  Directive,
  Input,
  HostBinding,
  Renderer2,
  ElementRef,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[componentLoading]',
})
export class LoadingDirective implements OnInit, OnChanges {
  @HostBinding('style.position') hostPosition: string = 'relative';

  @Input() componentLoading: boolean = false;

  uid!: string;

  constructor(private targetEl: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.uid = 'loading-container-' + this.generateRandomString();

    const loadingContainer = this.renderer.createElement('div');
    this.renderer.setStyle(
      loadingContainer,
      'display',
      this.componentLoading ? 'flex' : 'none'
    );
    this.renderer.setStyle(loadingContainer, 'justify-content', 'center');
    this.renderer.setStyle(loadingContainer, 'align-items', 'center');
    this.renderer.addClass(loadingContainer, this.uid);
    this.renderer.setStyle(loadingContainer, 'position', 'absolute');
    this.renderer.setStyle(loadingContainer, 'top', '0');
    this.renderer.setStyle(loadingContainer, 'background', '#ffffff80');
    this.renderer.setStyle(loadingContainer, 'width', '100%');
    this.renderer.setStyle(loadingContainer, 'height', '100%');
    this.renderer.setStyle(loadingContainer, 'z-index', '9');

    // custom spinner -- start
    const spinnerContainer = this.renderer.createElement('div');
    this.renderer.addClass(spinnerContainer, 'me-component-loader');
    const spinnerInnerDiv1 = this.renderer.createElement('div');
    const spinnerInnerDiv2 = this.renderer.createElement('div');
    const spinnerInnerDiv3 = this.renderer.createElement('div');
    const spinnerInnerDiv4 = this.renderer.createElement('div');
    const spinnerInnerDiv5 = this.renderer.createElement('div');
    const spinnerInnerDiv6 = this.renderer.createElement('div');
    const spinnerInnerDiv7 = this.renderer.createElement('div');
    const spinnerInnerDiv8 = this.renderer.createElement('div');
    const spinnerInnerDiv9 = this.renderer.createElement('div');
    const spinnerInnerDiv10 = this.renderer.createElement('div');
    const spinnerInnerDiv11 = this.renderer.createElement('div');
    const spinnerInnerDiv12 = this.renderer.createElement('div');

    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv1);
    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv2);
    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv3);
    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv4);
    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv5);
    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv6);
    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv7);
    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv8);
    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv9);
    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv10);
    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv11);
    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv12);

    this.renderer.appendChild(loadingContainer, spinnerContainer);

    this.renderer.appendChild(this.targetEl.nativeElement, loadingContainer);
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges.componentLoading) {
      const container = this.targetEl.nativeElement;
      const div = container.querySelector('.' + this.uid);

      if (div) {
        this.renderer.setStyle(
          div,
          'display',
          this.componentLoading ? 'flex' : 'none'
        );
      }
    }
  }

  generateRandomString(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
}
