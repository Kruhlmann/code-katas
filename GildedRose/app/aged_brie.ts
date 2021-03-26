import { IItemHandler, ItemHandler } from "./item_handler";

export class AgedBrie extends ItemHandler implements IItemHandler {
    public update_expiration(): void {
        this.increase_item_quality_if_not_max();
    }

    public update_quality(): void {
        this.increase_item_quality_if_not_max();
    }
}
