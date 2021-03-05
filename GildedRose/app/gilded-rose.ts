import { GildedRoseItem } from "./item";

export class GildedRose {
    items: Array<GildedRoseItem>;

    public constructor(items = [] as Array<GildedRoseItem>) {
        this.items = items;
    }

    public updateQuality(): GildedRoseItem[] {
        for (const item of this.items) {
            item.update();
        }

        return this.items;
    }
}
