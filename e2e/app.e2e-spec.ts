import { AppPage } from './app.po';

describe('ng-alt App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display app', () => {
    page.navigateTo();
    expect(page).toBeTruthy();
  });
});
