import { BasePage } from "./base.page.js";

export class DragDropPg extends BasePage {

    /**
     * 
     * @param {import("k6/experimental/browser.js").Page} page 
     */
    constructor(page) {
        super(page);
        this.box_A = page.locator("div#column-a");
        this.box_B = page.locator("div#column-b");
    }

    async drag_boxA_into_boxB() {
        await  this.box_A.dragTo(this.box_B);

        // await this.page.dragAndDrop("div#column-a", "div#column-b");
    }

    async drag_boxA_into_boxB_mouse() {
        await this.box_A.hover();
        await this.page.mouse.down();
        await this.box_B.hover();
        await this.page.mouse.up();
    }
}