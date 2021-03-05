class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRoseItem extends Item {
    public increase_quality(): void {
        this.quality++;
    }

    public decrease_quality(): void {
        this.quality--;
    }

    public increase_item_quality_if_not_max(): void {
        if (this.quality < 50) {
            this.increase_quality();
        }
    }

    public increase_back_stage_pass_quality_if_far_from_expiring(): void {
        if (this.sellIn < 11) {
            this.increase_item_quality_if_not_max();
        }
    }

    public increase_back_stage_pass_quality_if_close_to_expiring(): void {
        if (this.sellIn < 6) {
            this.increase_item_quality_if_not_max();
        }
    }
}
