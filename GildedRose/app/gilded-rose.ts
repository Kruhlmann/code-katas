import { GildedRoseItem } from "./item";

export class GildedRose {
    items: Array<GildedRoseItem>;

    public constructor(items = [] as Array<GildedRoseItem>) {
        this.items = items;
    }

    public updateQuality(): GildedRoseItem[] {
        for (const item of this.items) {
            this.update_item_quality(item);
            this.update_item_sell_in_date(item);
        }

        return this.items;
    }

    private update_item_sell_in_date(item: GildedRoseItem) {
        if (item.name != "Sulfuras, Hand of Ragnaros") {
            item.sellIn = item.sellIn - 1;
        }
        this.update_items_expiration_if_expired(item);
    }

    private update_items_expiration_if_expired(item: GildedRoseItem) {
        if (item.sellIn < 0) {
            this.update_item_expiration(item);
        }
    }

    private update_item_expiration(item: GildedRoseItem) {
        if (item.name != "Aged Brie") {
            this.update_non_brie_item_expiration(item);
        } else {
            this.update_brie_item_expiration(item);
        }
    }

    private update_brie_item_expiration(item: GildedRoseItem) {
        if (item.quality < 50) {
            item.increase_quality();
        }
    }

    private update_non_brie_item_expiration(item: GildedRoseItem) {
        if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
            this.decrease_item_quality_if_has_quality(item);
        } else {
            item.quality = 0;
        }
    }

    private update_item_quality(item: GildedRoseItem) {
        if (item.name != "Aged Brie" && item.name != "Backstage passes to a TAFKAL80ETC concert") {
            this.decrease_item_quality_if_has_quality(item);
        } else {
            this.increase_back_stage_pass_quality(item);
        }
    }

    private decrease_item_quality_if_has_quality(item: GildedRoseItem) {
        if (item.quality > 0) {
            if (item.name != "Sulfuras, Hand of Ragnaros") {
                item.decrease_quality();
            }
        }
    }

    private increase_back_stage_pass_quality(item: GildedRoseItem) {
        item.increase_item_quality_if_not_max();
        if (item.quality < 50) {
            item.increase_quality_if_backstage_pass();
        }
    }
}
