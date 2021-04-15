import { IUpdateableItem } from "./item_handler";

export interface IItemFactory {
    create_item_handler(item_name: string): IUpdateableItem;
}

export class IItemFactory implements IItemFactory {
    public create_item_handler(item_name: string): IUpdateableItem {}
}
