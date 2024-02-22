import { CommonModule } from '@angular/common';
import { Component, ContentChild, ContentChildren, Directive, Input, QueryList, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[stepperContent]',
  standalone: true
})
export class StepperContent {
  templateRef = inject(TemplateRef);
}

@Directive({
  selector: '[stepperItem]',
  standalone: true,
  host: {
    '[class.active]': 'container.stepId === stepId',
    '[class.completed]': 'container.stepId > stepId',
    class: 'stepper-item',
  }
})
export class StepperItem {
  container = inject(StepperContainer);

  @Input()
  stepId: any;

  @ContentChild(StepperContent, { descendants: false })
  content?: StepperContent;
}

@Directive({
  selector: '[stepperContainer]',
  exportAs: 'stepperContainer',
  standalone: true,
  host: {
    class: 'stepper-wrapper'
  }
})
export class StepperContainer {
  stepId = 0;
  valid = false;

  @ContentChildren(StepperItem, { descendants: false })
  items?: QueryList<StepperItem>;

  next() {
    if (!this.items)
      return;

    this.stepId++;
    this.valid = false;

    if (this.stepId > this.items.length)
      this.stepId = this.items.length;
  }

  back() {
    this.stepId--;
    this.valid = false;

    if (this.stepId < 0)
      this.stepId = 0;
  }

  get last() {
    return this.items && this.stepId >= (this.items.length - 1);
  }

  get content() {
    return this.getItem(this.stepId)?.content?.templateRef;
  }

  private getItem(stepId: number) {
    return this.items && this.items.find(x => x.stepId === stepId);
  }
}

@Component({
  selector: 'stepper-outlet',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-container *ngTemplateOutlet="container?.content || null"></ng-container>`
})
export class StepperOutlet {
  @Input()
  container?: StepperContainer;
}