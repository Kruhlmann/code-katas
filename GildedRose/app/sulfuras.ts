import { ItemHandler } from "./item_handler";

export class Sulfuras extends ItemHandler {
    public update_expiration(): void {}

    public update_quality(): void {}

    public is_sulfuras_hand_of_ragnaros(): boolean {
        return true;
    }
}

export class NotSulfuras extends ItemHandler {
    public update_expiration(): void {
        this.item.decrease_quality_if_non_zero();
    }

    public update_quality(): void {
        this.item.decrease_quality_if_non_zero();
    }

    public is_sulfuras_hand_of_ragnaros(): boolean {
        return false;
    }
}
