import { ItemHandler } from "./item_handler";

export class Sulfuras extends ItemHandler {
    public update_expiration(): void {}

    public update_quality(): void {}

    public increase_quality(): void {}

    public decrease_quality(): void {}

    public update_sell_in_date(): void {}

    public is_sulfuras_hand_of_ragnaros(): boolean {
        return true;
    }
}

export class NotSulfuras extends ItemHandler {
    public update_expiration(): void {
        this.decrease_quality_if_non_zero();
    }

    public update_quality(): void {
        this.decrease_quality_if_non_zero();
    }

    public is_sulfuras_hand_of_ragnaros(): boolean {
        return false;
    }
}
