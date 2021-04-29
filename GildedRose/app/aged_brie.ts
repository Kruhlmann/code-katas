import { IItem, Item } from "./item";

export class AgedBrie extends Item implements IItem {
    public update_expiration(): void {
        this.increase_item_quality_if_not_max();
    }

    public update_quality(): void {
        this.increase_item_quality_if_not_max();
    }
}
