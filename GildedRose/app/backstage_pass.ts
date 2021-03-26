import { ItemHandler } from "./item_handler";

export class BackstagePass extends ItemHandler {
    private readonly BACKSTAGE_PASS_FAR_DATE_LIMIT = 11;
    private readonly BACKSTAGE_PASS_CLOSE_DATE_LIMIT = 6;

    public update_quality(): void {
        this.increase_item_quality_if_not_max();
        if (this.item.quality < this.MAX_QUALITY) {
            this.update_threshold_based_quality();
        }
    }

    public update_threshold_based_quality(): void {
        this.increase_back_stage_pass_quality_if_far_from_expiring();
        this.increase_back_stage_pass_quality_if_close_to_expiring();
    }

    public update_expiration(): void {
        this.item.quality = 0;
    }

    private increase_back_stage_pass_quality_if_far_from_expiring(): void {
        if (this.item.sellIn < this.BACKSTAGE_PASS_FAR_DATE_LIMIT) {
            this.increase_item_quality_if_not_max();
        }
    }

    private increase_back_stage_pass_quality_if_close_to_expiring(): void {
        if (this.item.sellIn < this.BACKSTAGE_PASS_CLOSE_DATE_LIMIT) {
            this.increase_item_quality_if_not_max();
        }
    }
}
