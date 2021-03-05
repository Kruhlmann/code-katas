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
    private is_aged_brie: boolean;
    private is_backstage_pass: boolean;
    private is_sulfuras_hand_of_ragnaros: boolean;

    public constructor(name: string, sellIn: number, quality: number) {
        super(name, sellIn, quality);
        this.is_aged_brie = this.name === "Aged Brie";
        this.is_backstage_pass = this.name === "Backstage passes to a TAFKAL80ETC concert";
        this.is_sulfuras_hand_of_ragnaros = this.name === "Sulfuras, Hand of Ragnaros";
    }

    public update(): void {
        this.update_quality();
        this.update_sell_in_date();
    }

    private update_quality(): void {
        if (!this.is_aged_brie && !this.is_backstage_pass) {
            this.decrease_quality_if_non_zero();
        } else {
            this.increase_back_stage_pass_quality();
        }
    }

    private decrease_sell_in_date(): void {
        this.sellIn--;
    }

    private update_sell_in_date(): void {
        if (this.can_expire()) {
            this.decrease_sell_in_date();
        }
        this.update_expiration_if_not_expired();
    }

    private update_expiration(): void {
        if (this.is_aged_brie) {
            this.handle_expiration();
        } else {
            this.increase_item_quality_if_not_max();
        }
    }

    private update_expiration_if_not_expired(): void {
        if (this.is_expired()) {
            this.update_expiration();
        }
    }

    private is_expired(): boolean {
        return this.sellIn < 0;
    }

    private increase_quality(): void {
        if (this.can_have_modified_quality()) {
            this.quality++;
        }
    }

    private decrease_quality(): void {
        if (this.can_have_modified_quality()) {
            this.quality--;
        }
    }

    private increase_item_quality_if_not_max(): void {
        if (this.quality < 50) {
            this.increase_quality();
        }
    }
    private can_have_modified_quality(): boolean {
        return !this.is_sulfuras_hand_of_ragnaros;
    }

    private can_expire(): boolean {
        return !this.is_sulfuras_hand_of_ragnaros;
    }

    private increase_back_stage_pass_quality(): void {
        this.increase_item_quality_if_not_max();
        if (this.quality < 50) {
            this.increase_quality_if_backstage_pass();
        }
    }

    private increase_quality_if_backstage_pass(): void {
        if (this.is_backstage_pass) {
            this.increase_back_stage_pass_quality_if_far_from_expiring();
            this.increase_back_stage_pass_quality_if_close_to_expiring();
        }
    }

    private increase_back_stage_pass_quality_if_far_from_expiring(): void {
        if (this.sellIn < 11) {
            this.increase_item_quality_if_not_max();
        }
    }

    private decrease_quality_if_non_zero(): void {
        if (this.quality > 0) {
            this.decrease_quality();
        }
    }

    private increase_back_stage_pass_quality_if_close_to_expiring(): void {
        if (this.sellIn < 6) {
            this.increase_item_quality_if_not_max();
        }
    }

    private handle_expiration() {
        if (!this.is_backstage_pass) {
            this.decrease_quality_if_non_zero();
        } else {
            this.quality = 0;
        }
    }
}
