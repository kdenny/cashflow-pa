import {Component, Input, OnDestroy} from '@angular/core';

@Component({
  selector: 'accordion',
  template:`
  <ng-content></ng-content>
          `,
  host: {
    'class': 'card-group'
  }
})
export class Accordion {
  groups: Array<AccordionGroup> = [];

  addGroup(group: AccordionGroup): void {
    this.groups.push(group);
  }

  closeOthers(openGroup: AccordionGroup): void {
    this.groups.forEach((group: AccordionGroup) => {
      if (group !== openGroup) {
        group.isOpen = false;
      }
    });
  }

  removeGroup(group: AccordionGroup): void {
    const index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
  }
}

@Component({
  selector: 'accordion-group',
  template:`
                <div class="card" [ngClass]="{'panel-open': isOpen}">
                  <div class="card-block">
                    <h4 class="card-title" (click)="toggleOpen($event)" style="background:#002A86;"><a href tabindex="0" style="padding-left: 30px; color:white;"><span>{{heading}}</span></a></h4>
                    <div class="card-text" [hidden]="!isOpen">
                        <ng-content></ng-content>
                    </div>
                  </div>
                </div>
          `,

})
export class AccordionGroup implements OnDestroy {
  private _isOpen:boolean = false;

  @Input() heading: string;

  @Input()
  set isOpen(value: boolean) {
    this._isOpen = value;
    if (value) {
      this.accordion.closeOthers(this);
    }
  }

  get isOpen() {
    return this._isOpen;
  }

  constructor(private accordion: Accordion) {
    this.accordion.addGroup(this);
  }

  ngOnDestroy() {
    this.accordion.removeGroup(this);
  }

  toggleOpen(event: MouseEvent): void {
    event.preventDefault();
    this.isOpen = !this.isOpen;
  }
}
