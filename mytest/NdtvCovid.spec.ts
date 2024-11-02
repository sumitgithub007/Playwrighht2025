import  {test,Browser,Page, BrowserContext, Locator} from "@playwright/test"

import {webkit,firefox,chromium} from "playwright"

test("Covid Cases Test Case",async()=>{

    
    const browser:Browser = await chromium.launch({headless:false,channel:'chrome'});
    const browserContext:BrowserContext = await browser.newContext();
    const page:Page = await browserContext.newPage();

    await  page.goto("https://cdn.ndtv.com/coronavirus/light/table/india_table.html?shgraph=1");
    
   
    await page.waitForSelector(".sort.sort.sorttable_sorted", { state: 'attached', timeout:6000 });

    const allCases:Locator = page.locator("//tbody/tr/td[5]/p");
    const len =  await allCases.count();
    
   let sum:number=0;
   for(let i=0;i<len;++i)
   {
     let data:string|null =  await allCases.nth(i).innerText(); //innertext se \n dikhega else textContent ek line me
     let first_data:string =  data.split("\n")[0].replaceAll(",","");
     let data_int:number = parseInt(first_data);
     sum=sum+data_int;     
   }  
   console.log("sum is ="+sum);
    

});