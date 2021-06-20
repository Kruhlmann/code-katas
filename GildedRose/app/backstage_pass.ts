import { IItem, Item } from "./item";

export class BackstagePass extends Item implements IItem {
    private readonly BACKSTAGE_PASS_FAR_DATE_LIMIT = 11;
    private readonly BACKSTAGE_PASS_CLOSE_DATE_LIMIT = 6;

    public update_quality(): void {
        this.increase_item_quality_if_not_max();
        if (this.quality < this.MAX_QUALITY) {
            this.update_threshold_based_quality();
        }
    }

    public update_threshold_based_quality(): void {
        this.increase_back_stage_pass_quality_if_far_from_expiring();
        this.increase_back_stage_pass_quality_if_close_to_expiring();
    }

    public update_expiration(): void {
        this.quality = 0;
    }

    private increase_back_stage_pass_quality_if_far_from_expiring(): void {
        if (this.sell_in < this.BACKSTAGE_PASS_FAR_DATE_LIMIT) {
            this.increase_item_quality_if_not_max();
        }
    }

    private increase_back_stage_pass_quality_if_close_to_expiring(): void {
        if (this.sell_in < this.BACKSTAGE_PASS_CLOSE_DATE_LIMIT) {
            this.increase_item_quality_if_not_max();
        }
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

    public update(): void {}
}
