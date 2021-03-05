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
}
