import  {test,Browser,Page, BrowserContext, Locator} from "@playwright/test"
import {webkit,firefox,chromium} from "playwright"

test.only("Multiple Tabs Test Case",async()=>{

    
    
    const browser:Browser = await chromium.launch({headless:false,channel:'chrome'});
    const browserContext:BrowserContext = await browser.newContext();
    const page:Page = await browserContext.newPage();
    
    await page.goto('https://www.myntra.com'); // Replace with the URL containing the links

    await page.waitForLoadState();
    const links = await page.locator("(//div[@class='navFooterLinkCol navAccessibility'])[1]").all(); // Replace with your link selector
     
 
    await page.waitForSelector("//div[@class='desktop-customerPolicies']",{ state: 'visible', timeout: 14000 });
    
    const locators:Locator =  page.locator("//div[@class='desktop-customerPolicies']//a");

    const totalCount:number = await locators.count();
 
    // Press Control key down
    await page.keyboard.down('Control');

    // Click on each link to open in a new tab
    for (const locator of await locators.all()) {
        await locator.click();
    }

    // Wait for all tabs to open
    const waitForPages = new Promise<Page[]>((resolve,reject) => {
        const checkPages = () =>
             {
            const pages = browserContext.pages();
            if (pages.length === totalCount+1) {
                resolve(pages);
            } else {
                setTimeout(checkPages, 1000); // Check again after a short delay
            }
        };
        checkPages();
    });

    const pages:Page[] = await waitForPages;

    // Release the Control key
    await page.keyboard.up('Control');

    console.log(pages.length);
    
    for (const tab of pages) {
        await tab.bringToFront();
        await tab.waitForLoadState();
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Sleep for 1 second
        console.log(await tab.title());
    }

    await browser.close();
    
});
