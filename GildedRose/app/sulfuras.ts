import { IItem, Item } from "./item";

export class Sulfuras extends Item implements IItem {
    public update_expiration(): void {}

    public update_quality(): void {}

    public increase_quality(): void {}

    public decrease_quality(): void {}

    public update_sell_in_date(): void {}
}
