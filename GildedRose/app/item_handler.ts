import { GildedRoseItem } from "./item";

export interface IItemHandler {
    update_expiration(): void;
    update_quality(): void;
    is_sulfuras_hand_of_ragnaros(): boolean;
}

export abstract class ItemHandler implements IItemHandler {
    protected readonly item: GildedRoseItem;

    public constructor(item: GildedRoseItem) {
        this.item = item;
    }

    public abstract update_expiration(): void;
    public abstract update_quality(): void;
    public abstract is_sulfuras_hand_of_ragnaros(): boolean;
}
