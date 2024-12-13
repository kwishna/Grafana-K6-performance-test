import { BasePage } from "./base.page.js";

export class CheckBoxPg extends BasePage {

    /**
     * 
     * @param {import("k6/experimental/browser.js").Page} page 
     */
    constructor(page) {
        super(page);

        this.checkbox_1 = page.locator("//form[@id='checkboxes']//input[@type='checkbox'][1]");
        this.checkbox_2 = page.locator("//form[@id='checkboxes']//input[@type='checkbox'][2]");
    }

    async check_box_one() {
        const is_checked = await this.checkbox_2.isChecked();
        if (is_checked) {
            this.checkbox_2.uncheck();
            this.checkbox_1.check();
        }
        else {
            this.checkbox_1.uncheck();
            this.checkbox_2.check();
        }
    }
}