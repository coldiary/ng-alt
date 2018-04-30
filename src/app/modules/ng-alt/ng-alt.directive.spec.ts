import { Component } from '@angular/core';
import { NgAltGroupDirective, NgAltDirective } from './ng-alt.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgAltModule } from './ng-alt.module';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div ngAltGroup>
      <span *ngAlt="a">A</span>
      <span *ngAlt="b">B</span>
      <span *ngAlt="c">C</span>
    </div>
  `,
})
class TestComponent {
  a = false;
  b = false;
  c = false;
}

describe('NgAltDirectives', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let imgs: HTMLImageElement[];
  let container: HTMLDivElement;
  let alternatives: HTMLSpanElement[];

  const init = ({ a = false, b = false, c = false }) => {
    Object.assign(component, { a, b, c });
    fixture.detectChanges();
    container = fixture.debugElement.query(By.css('[ngAltGroup]')).nativeElement;
    alternatives = fixture.debugElement.queryAll(By.css('span')).map(e => e.nativeElement);
  }

  const test = (input = {}, output = null) => {
    const expectedContent = output || '';
    const expectedLength = (output && 1) || 0;
    init(input);
    expect(container).toBeTruthy();
    expect(container.textContent.trim()).toEqual(expectedContent);
    expect(alternatives.length).toEqual(expectedLength);
  }

  beforeEach(async done => {
    fixture = TestBed.configureTestingModule({
      declarations: [ TestComponent],
      imports: [ NgAltModule ],
    }).createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    done();
  });

  it('should create an instance of NgAltGroupDirective', () => expect(new NgAltGroupDirective()).toBeTruthy());
  it('should create an instance of NgAltDirective', () => expect(new NgAltDirective(null, null, null)).toBeTruthy());
  it('should create an instance of TestComponent', () => expect(component).toBeTruthy());

  it('should display nothing if alternatives are all false', () => test());
  it('should display A if alternative A is true', () => test({ a: true }, 'A'));
  it('should display A if alternative A and B are true', () => test({ a: true, b: true }, 'A'));
  it('should display A if all alternatives are true', () => test({ a: true, b: true, c: true }, 'A'));
  it('should display B if alternative B and C are true', () => test({ b: true, c: true }, 'B'));
  it('should display A if alternative A and C are true', () => test({ a: true, c: true }, 'A'));
  it('should display C if only alternative C is true', () => test({ c: true }, 'C'));

});