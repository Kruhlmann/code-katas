import { UpdateableItem } from "./item";

export class GildedRose {
    items: Array<UpdateableItem>;

    public constructor(items = [] as Array<UpdateableItem>) {
        this.items = items;
    }

    public updateQuality(): UpdateableItem[] {
        for (const item of this.items) {
            item.handler.update();
        }

        return this.items;
    }
}
