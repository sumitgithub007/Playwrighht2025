import  {test,Browser,Page, BrowserContext, Locator} from "@playwright/test"
import { skip } from "node:test";

import {webkit,firefox,chromium} from "playwright"


test("Yahoo Test Case",async()=>{

    
    const browser:Browser = await chromium.launch({headless:false,channel:'chrome'});
    const browserContext:BrowserContext = await browser.newContext();
    const page:Page = await browserContext.newPage();

    await  page.goto("https://www.yahoo.com/");
    const inputBox:Locator =  page.locator("(//input[@type='text'])[1]");
    inputBox.fill("rjp");
    const listBox:Locator =  page.locator("//ul[@role='listbox']");
   
    await page.waitForSelector("//ul[@role='listbox']", { state: 'visible', timeout: 14000 });

    const allData:Locator = page.locator("//ul[@role='listbox']//li/span[1]");
    const len =  await allData.count();
    
     
   for(let i=0;i<len;++i)
   {
     let data:string|null =  await allData.nth(i).textContent();
      if(data==="rjp electric")
      {
        await allData.nth(i).click();
        break;
      }
      // console.log(data);
   }  
   
  await page.pause();

});