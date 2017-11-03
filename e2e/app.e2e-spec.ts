import { PhrigLeafletStarterPage } from './app.po';

describe('phrig-leaflet-starter App', function() {
  let page: PhrigLeafletStarterPage;

  beforeEach(() => {
    page = new PhrigLeafletStarterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
