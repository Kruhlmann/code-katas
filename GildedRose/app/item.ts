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

    public is_backstage_pass(): boolean {
        return this.name == "Backstage passes to a TAFKAL80ETC concert";
    }

    public increase_quality_if_backstage_pass(): void {
        if (this.is_backstage_pass()) {
            this.increase_back_stage_pass_quality_if_far_from_expiring();
            this.increase_back_stage_pass_quality_if_close_to_expiring();
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
