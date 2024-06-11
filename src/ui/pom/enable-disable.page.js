import { BasePage } from "./base.page.js";

export class EnableDiablePg extends BasePage {

    /**
     * 
     * @param {import("k6/experimental/browser.js").Page} page 
     */
    constructor(page) {
        super(page);
        this.input_box = page.locator("form#input-example input");
        this.enable_btn = page.locator("form#input-example button");
        this.loading_bar = page.locator("//div[@id='loading'][contains(text(),'Wait for it')] >> visible=true");
    }

    async enable_diable_input_box() {
        const is_box_enabled = await this.input_box.isEnabled();

        if (!is_box_enabled) {
            await this.enable_btn.click();
            await this.loading_bar.waitFor({ state: 'hidden' });
        }
        else {
            await this.enable_btn.click();
            await this.loading_bar.waitFor({ state: 'hidden' });
        }
    }
}