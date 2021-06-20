import { IItem, Item } from "./item";

export class AgedBrie extends Item implements IItem {
    protected update_expiration(): void {
        this.increase_item_quality_if_not_max();
    }

    protected update_quality(): void {
        this.increase_item_quality_if_not_max();
    }

    protected increase_item_quality_if_not_max(): void {
        if (this.quality < this.MAX_QUALITY) {
            this.quality++;
        }
    }

    protected update_sell_in_date(): void {
        this.sell_in = this.sell_in--;

        const is_expired = this.sell_in < 0;
        if (is_expired) {
            this.update_expiration();
        }
    }
}
