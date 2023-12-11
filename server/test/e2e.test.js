const puppeteer = require('puppeteer');
const { expect } = require('chai');

describe('E2E Tests', () => {
  let browser;
  let page;




  before(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  
  after(async () => {
    await browser.close();
  });

  
  it('should have the correct title on the home page', async () => {
    await page.goto('http://localhost:3000/'); 
    const title = await page.title();
   
    expect(title).to.equal('React App'); 
  });

  
  it('should display a welcome message', async () => {
    await page.goto('http://localhost:3000/'); 
    const welcomeMessage = await page.$eval('#hero-head', (el) => el.textContent);

    expect(welcomeMessage).to.equal('Personal Budget');
  });

  
})