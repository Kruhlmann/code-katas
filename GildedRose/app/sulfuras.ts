import { IItem, Item } from "./item";

export class Sulfuras extends Item implements IItem {
    protected update_expiration(): void {}

    protected update_quality(): void {}

    protected update_sell_in_date(): void {}
}
