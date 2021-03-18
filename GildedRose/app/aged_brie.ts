import { SpecialItemNames } from "./item";
import { IItemHandler, ItemHandler } from "./item_handler";

export class AgedBrie extends ItemHandler implements IItemHandler {
    public update_expiration(): void {
        this.item.increase_item_quality_if_not_max();
    }

    public update_quality(): void {
        this.item.increase_item_quality_if_not_max();
    }

    public is_sulfuras_hand_of_ragnaros(): boolean {
        return false;
    }
}

export class NotAgedBrie extends ItemHandler {
    public update_expiration(): void {
        this.item.backstage_pass.update_expiration();
    }

    public is_sulfuras_hand_of_ragnaros(): boolean {
        return this.item.name === SpecialItemNames.SULFURAS_HAND_OF_RAGNAROS;
    }

    public update_quality(): void {
        this.item.backstage_pass.update_quality();
    }
}
