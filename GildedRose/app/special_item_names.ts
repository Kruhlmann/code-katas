export class SpecialItemNames {
    public static readonly AGED_BRIE = "Aged Brie";
    public static readonly BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert";
    public static readonly SULFURAS_HAND_OF_RAGNAROS = "Sulfuras, Hand of Ragnaros";

    public static get_all_special_names(): string[] {
        return [this.AGED_BRIE, this.BACKSTAGE_PASS, this.SULFURAS_HAND_OF_RAGNAROS];
    }
}
