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

    public constructor(name: string, sellIn: number, quality: number) {
        super(name, sellIn, quality);
        this.aged_brie = this.name === SpecialItemNames.AGED_BRIE ? new AgedBrie(this) : new NotAgedBrie(this);
        this.backstage_pass =
            this.name === SpecialItemNames.BACKSTAGE_PASS ? new BackstagePass(this) : new NotBackstagePass(this);
        this.sulfuras =
            this.name === SpecialItemNames.SULFURAS_HAND_OF_RAGNAROS ? new Sulfuras(this) : new NotSulfuras(this);
    }

    public update(): void {
        this.aged_brie.update();
    }
}
