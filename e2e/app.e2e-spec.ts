import { WidgetFrameworkPage } from './app.po';

describe('widget-framework App', () => {
  let page: WidgetFrameworkPage;

  beforeEach(() => {
    page = new WidgetFrameworkPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
