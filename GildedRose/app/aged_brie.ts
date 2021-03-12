import { GildedRoseItem, SpecialItemNames } from "./item";

export abstract class ItemHandler {
    protected readonly item: GildedRoseItem;

    public constructor(item: GildedRoseItem) {
        this.item = item;
    }

    public abstract update_expiration(): void;
    public abstract update_quality(): void;
    public abstract is_backstage_pass(): boolean;
    public abstract is_sulfuras_hand_of_ragnaros(): boolean;
}

export class AgedBrie extends ItemHandler {
    public update_expiration(): void {
        this.item.increase_item_quality_if_not_max();
    }

    public update_quality(): void {
        this.item.increase_back_stage_pass_quality();
    }

    public is_backstage_pass(): boolean {
        return false;
    }

    public is_sulfuras_hand_of_ragnaros(): boolean {
        return false;
    }
}

export class NotAgedBrie extends ItemHandler {
    public update_expiration(): void {
        if (!this.item.backstage_pass.is_backstage_pass()) {
            this.item.decrease_quality_if_non_zero();
        } else {
            this.item.quality = 0;
        }
    }

    public is_backstage_pass(): boolean {
        return this.item.name === SpecialItemNames.BACKSTAGE_PASS;
    }

    public is_sulfuras_hand_of_ragnaros(): boolean {
        return this.item.name === SpecialItemNames.SULFURAS_HAND_OF_RAGNAROS;
    }

    public update_quality(): void {
        if (!this.is_backstage_pass()) {
            this.item.decrease_quality_if_non_zero();
        } else {
            this.item.increase_back_stage_pass_quality();
        }
    }
}
