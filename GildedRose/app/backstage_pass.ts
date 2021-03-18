import { SpecialItemNames } from "./item";
import { ItemHandler } from "./item_handler";

export class BackstagePass extends ItemHandler {
    public is_sulfuras_hand_of_ragnaros(): boolean {
        return false;
    }

    public update_quality(): void {
        this.item.increase_item_quality_if_not_max();
        if (this.item.quality < this.item.MAX_QUALITY) {
            this.increase_back_stage_pass_quality_if_far_from_expiring();
            this.increase_back_stage_pass_quality_if_close_to_expiring();
        }
    }

    public update_expiration(): void {
        this.item.quality = 0;
    }

    private increase_back_stage_pass_quality_if_far_from_expiring(): void {
        if (this.item.sellIn < this.item.BACKSTAGE_PASS_FAR_DATE_LIMIT) {
            this.item.increase_item_quality_if_not_max();
        }
    }

    private increase_back_stage_pass_quality_if_close_to_expiring(): void {
        if (this.item.sellIn < this.item.BACKSTAGE_PASS_CLOSE_DATE_LIMIT) {
            this.item.increase_item_quality_if_not_max();
        }
    }
}

export class NotBackstagePass extends ItemHandler {
    public is_sulfuras_hand_of_ragnaros(): boolean {
        return this.item.name === SpecialItemNames.SULFURAS_HAND_OF_RAGNAROS;
    }

    public update_quality(): void {
        this.item.decrease_quality_if_non_zero();
    }

    public update_expiration(): void {
        this.item.decrease_quality_if_non_zero();
    }

    public increase_quality_including_backstage_passes(): void {
        this.item.increase_item_quality_if_not_max();
    }
}
