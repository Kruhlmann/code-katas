import { IItem } from "./item";

export class GildedRose {
    items: Array<IItem>;

    public constructor(items = [] as IItem[]) {
        this.items = items;
    }

    public updateQuality(): IItem[] {
        for (const item of this.items) {
            item.update();
        }

        return this.items;
    }
}
