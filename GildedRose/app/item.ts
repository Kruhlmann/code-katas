import { AgedBrie, NotAgedBrie } from "./aged_brie";
import { BackstagePass, NotBackstagePass } from "./backstage_pass";
import { IItemHandler } from "./item_handler";
import { NotSulfuras, Sulfuras } from "./sulfuras";

export interface IItem {
    name: string;
    sellIn: number;
    quality: number;
}

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

export class SpecialItemNames {
    public static readonly AGED_BRIE = "Aged Brie";
    public static readonly BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert";
    public static readonly SULFURAS_HAND_OF_RAGNAROS = "Sulfuras, Hand of Ragnaros";
}

export class GildedRoseItem extends Item {
    public readonly aged_brie: IItemHandler;
    public readonly backstage_pass: IItemHandler;
    public readonly sulfuras: IItemHandler;

    public readonly MAX_QUALITY = 50;
    public readonly BACKSTAGE_PASS_FAR_DATE_LIMIT = 11;
    public readonly BACKSTAGE_PASS_CLOSE_DATE_LIMIT = 6;

    public constructor(name: string, sellIn: number, quality: number) {
        super(name, sellIn, quality);
        this.aged_brie = this.name === SpecialItemNames.AGED_BRIE ? new AgedBrie(this) : new NotAgedBrie(this);
        this.backstage_pass =
            this.name === SpecialItemNames.BACKSTAGE_PASS ? new BackstagePass(this) : new NotBackstagePass(this);
        this.sulfuras =
            this.name === SpecialItemNames.SULFURAS_HAND_OF_RAGNAROS ? new Sulfuras(this) : new NotSulfuras(this);
    }

    public update(): void {
        this.aged_brie.update_quality();
        this.update_sell_in_date();
    }

    public decrease_quality_if_non_zero(): void {
        if (this.quality > 0) {
            this.decrease_quality();
        }
    }

    private update_sell_in_date(): void {
        if (this.can_expire()) {
            this.sellIn--;
        }
        this.update_expiration_if_not_expired();
    }

    private update_expiration_if_not_expired(): void {
        if (this.is_expired()) {
            this.aged_brie.update_expiration();
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

    public increase_item_quality_if_not_max(): void {
        if (this.quality < this.MAX_QUALITY) {
            this.increase_quality();
        }
    }
    private can_have_modified_quality(): boolean {
        return !this.aged_brie.is_sulfuras_hand_of_ragnaros();
    }

    private can_expire(): boolean {
        return !this.aged_brie.is_sulfuras_hand_of_ragnaros();
    }
}
