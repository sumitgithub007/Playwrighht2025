import  {test,Browser,Page, BrowserContext, Locator} from "@playwright/test"
import {webkit,firefox,chromium} from "playwright"

test("Two Tabs Handling Test Case",async()=>{

    
    
    const browser:Browser = await chromium.launch({headless:false,channel:'chrome'});
    const browserContext:BrowserContext = await browser.newContext();
    const page:Page = await browserContext.newPage();
    
    await page.goto("https://accounts.google.com/"); // Replace with the URL containing the links

    await page.waitForLoadState();
    
     //no need to use await here kuki wo chalta rhega and jse hi page ayga wo capture karlega
    const PromisePage:Promise<Page> =  browserContext.waitForEvent('page'); //yha await ku nai lagega else blocked
    await page.locator("//*[text()='Help']").click(); // Replace with your link selector

   
    const newPage:Page = await PromisePage;
    await newPage.waitForLoadState();
    await newPage.locator("//input[@class='promoted-search__input']").fill("sumit");
    

    await page.bringToFront();
    await page.pause();
});
