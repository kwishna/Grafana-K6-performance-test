import { browser, Page } from "k6/experimental/browser"

export class BasePage {

    /**
     * @description Base Page.
     * @param { Page } page 
     */
    constructor(page) {
        this.page = page;
        this.heading = page.locator("div#content h1");
        this.pg_heading = page.locator("div#content div.example h3");

        this.available_example = page.locator("div#content h2");
        this.ab_link = page.locator("a[href='/abtest']");
        this.dropdown = page.locator("a[href='/dropdown']");
        this.checkboxes = page.locator("a[href='/checkboxes']");
        this.drag_and_drop = page.locator("a[href='/drag_and_drop']");
        this.dynamic_ctrl = page.locator("a[href='/dynamic_controls']");
    }

    async navigate_to_homepage() {
        await this.page.goto("https://the-internet.herokuapp.com/");
    }

    async wait_for_homepage_to_load() {
        await this.heading.waitFor({state: "visible"});
        await this.available_example.waitFor({state: "visible"});
    }

    async click_ab_link() {
        await this.ab_link.click();
    }

    async click_dropdown_link() {
        await this.dropdown.click();
    }

    async click_checkboxes_link() {
        await this.checkboxes.click();
    }

    async click_drag_and_drop_link() {
        await this.drag_and_drop.click();
    }

    async click_dynamic_ctrl_link() {
        await this.dynamic_ctrl.click();
    }

    async get_heading() {
        return await this.pg_heading.textContent();
    }
}