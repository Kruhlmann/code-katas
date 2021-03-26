import { SpecialItemNames } from "./item";
import { ItemHandler } from "./item_handler";

export class BackstagePass extends ItemHandler {
    private readonly BACKSTAGE_PASS_FAR_DATE_LIMIT = 11;
    private readonly BACKSTAGE_PASS_CLOSE_DATE_LIMIT = 6;

    public is_sulfuras_hand_of_ragnaros(): boolean {
        return false;
    }

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

export class NotBackstagePass extends ItemHandler {
    public is_sulfuras_hand_of_ragnaros(): boolean {
        return this.item.name === SpecialItemNames.SULFURAS_HAND_OF_RAGNAROS;
    }

    public update_quality(): void {
        this.item.sulfuras.update_quality();
    }

    public update_expiration(): void {
        this.item.sulfuras.update_expiration();
    }

    public increase_quality(): void {
        this.item.sulfuras.increase_quality();
    }

    public decrease_quality(): void {
        this.item.sulfuras.decrease_quality();
    }

    public update_sell_in_date(): void {
        this.item.sulfuras.update_sell_in_date();
    }

    public decrease_quality_if_non_zero(): void {
        this.item.sulfuras.decrease_quality_if_non_zero();
    }
}
