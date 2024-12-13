import { BasePage } from "./base.page.js";

export class AbTestPage extends BasePage {
    
    /**
     * 
     * @param {import("k6/experimental/browser.js").Page} page 
     */
    constructor(page) {
        super(page);
        this.paragraph = page.locator("div#content div.example p");
    }

    async wait_for_ab_page_to_load() {
        await this.paragraph.waitFor({state: 'visible'});
    }
}