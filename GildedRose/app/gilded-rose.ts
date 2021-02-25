import { Item } from "./item";

export class GildedRose {
    public items: Array<Item>;

    public constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    public update() {
        for (const item of this.items) {
            item.update();
        }
    }
}
