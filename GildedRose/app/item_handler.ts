import { GildedRoseItem } from "./item";

export interface IItemHandler {
    update(): void;
    update_expiration(): void;
    update_quality(): void;
    is_sulfuras_hand_of_ragnaros(): boolean;
    increase_quality(): void;
    decrease_quality(): void;
    update_sell_in_date(): void;
    decrease_quality_if_non_zero(): void;
}

export abstract class ItemHandler implements IItemHandler {
    protected readonly MAX_QUALITY = 50;
    protected readonly item: GildedRoseItem;

    public constructor(item: GildedRoseItem) {
        this.item = item;
    }

    public update(): void {
        this.update_quality();
        this.update_sell_in_date();
    }

    public increase_item_quality_if_not_max(): void {
        if (this.item.quality < this.MAX_QUALITY) {
            this.increase_quality();
        }
    }

    public increase_quality(): void {
        this.item.quality++;
    }

    public decrease_quality(): void {
        this.item.quality--;
    }

    public update_sell_in_date(): void {
        this.item.sellIn--;
        this.update_expiration_if_not_expired();
    }

    public decrease_quality_if_non_zero(): void {
        if (this.item.quality > 0) {
            this.decrease_quality();
        }
    }

    public is_expired(): boolean {
        return this.item.sellIn < 0;
    }

    public update_expiration_if_not_expired(): void {
        if (this.is_expired()) {
            this.update_expiration();
        }
    }

    public abstract update_expiration(): void;
    public abstract update_quality(): void;
    public abstract is_sulfuras_hand_of_ragnaros(): boolean;
}
