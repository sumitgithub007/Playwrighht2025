import  {test,Browser,Page, BrowserContext, Locator, FrameLocator, expect} from "@playwright/test"
import {webkit,firefox,chromium} from "playwright"

test("Calendar  Case",async()=>{

    
    const browser:Browser = await chromium.launch({headless:false,channel:'chrome'});
    const browserContext:BrowserContext = await browser.newContext();
    const page:Page = await browserContext.newPage();

    const inputBox:Locator = page.locator("//input[@id='datepicker']");
    await  page.goto("https://jqueryui.com/datepicker/");
    const frame:FrameLocator =  page.frameLocator("//iframe"); //frame captured here
    await frame.locator(inputBox).click();
   
    const datePickerDiv:Locator = frame.locator("//div[@id='ui-datepicker-div']")
    await datePickerDiv.waitFor({state:"visible",timeout:5000}); 


    let year_month:Locator =  frame.locator("//div[@class='ui-datepicker-title']");
    let d:string|null = await frame.locator("//div[@class='ui-datepicker-title']").textContent();

    while(true)
    {

      let yr_mon:string|null = await year_month.textContent();
      let cleanedText:string|undefined = yr_mon?.replace(/\s+/g, '').trim();  //nbsp ki wajah se lagaya hai
      if(cleanedText==="November2034")
      {
        break;
      }
       await frame.locator("//*[text()='Next']").click();
    }


    //lets select dates
    
    let dates:Locator = frame.locator("//td[@data-handler='selectDay']");
    let total_count:number = await dates.count();
    
    for(let i=0;i<total_count;++i)
    {
      let date_txt:string|null = await dates.nth(i).textContent();
      if(date_txt==="27")
      {
        dates.nth(i).click();
        break;
      }
    }
    
    await page.pause();
  });