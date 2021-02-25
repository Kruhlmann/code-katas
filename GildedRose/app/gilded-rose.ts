export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    public constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    public updateQuality(): Item[] {
        for (const item of this.items) {
            this.update_item_quality(item);
            this.update_item_sell_in_date(item);
        }

        return this.items;
    }

    private update_item_sell_in_date(item: Item) {
        if (item.name != "Sulfuras, Hand of Ragnaros") {
            item.sellIn = item.sellIn - 1;
        }
        this.update_items_expiration_if_expired(item);
    }

    private update_items_expiration_if_expired(item: Item) {
        if (item.sellIn < 0) {
            this.update_item_expiration(item);
        }
    }

    private update_item_expiration(item: Item) {
        if (item.name != "Aged Brie") {
            this.update_non_brie_item_expiration(item);
        } else {
            this.update_brie_item_expiration(item);
        }
    }

    private update_brie_item_expiration(item: Item) {
        if (item.quality < 50) {
            item.quality = item.quality + 1;
        }
    }

    private update_non_brie_item_expiration(item: Item) {
        if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
            this.decrease_quality_if_item_has_quality(item);
        } else {
            item.quality = 0;
        }
    }

    private update_item_quality(item: Item) {
        if (item.name != "Aged Brie" && item.name != "Backstage passes to a TAFKAL80ETC concert") {
            this.decrease_quality_if_item_has_quality(item);
        } else {
            this.increase_back_stage_pass_quality(item);
        }
    }

    private decrease_quality_if_item_has_quality(item: Item) {
        if (item.quality > 0) {
            if (item.name != "Sulfuras, Hand of Ragnaros") {
                item.quality = item.quality - 1;
            }
        }
    }

    private increase_back_stage_pass_quality(item: Item) {
        if (item.quality < 50) {
            this.increase_item_quality_if_not_max(item);
            this.increase_back_stage_pass_quality_from_expiration(item);
        }
    }

    private increase_back_stage_pass_quality_from_expiration(item: Item) {
        if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
            this.increase_back_stage_pass_quality_if_far_from_expiring(item);
            this.increase_back_stage_pass_quality_if_close_to_expiring(item);
        }
    }

    private increase_back_stage_pass_quality_if_close_to_expiring(item: Item) {
        if (item.sellIn < 6) {
            this.increase_item_quality_if_not_max(item);
        }
    }

    private increase_back_stage_pass_quality_if_far_from_expiring(item: Item) {
        if (item.sellIn < 11) {
            this.increase_item_quality_if_not_max(item);
        }
    }

    private increase_item_quality_if_not_max(item: Item) {
        if (item.quality < 50) {
            this.increase_item_quality(item);
        }
    }

    private increase_item_quality(item: Item) {
        item.quality++;
    }
}
