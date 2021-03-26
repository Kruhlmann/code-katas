import { IItemHandler } from "./item_handler";
import { ItemHandlerFactory } from "./item_handler_factory";

export interface IItem {
    name: string;
    sellIn: number;
    quality: number;
}

class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class UpdateableItem extends Item {
    public readonly handler: IItemHandler;

    public constructor(name: string, sellIn: number, quality: number) {
        super(name, sellIn, quality);
        this.handler = new ItemHandlerFactory().create_item_handler_from_item(this);
    }
}
