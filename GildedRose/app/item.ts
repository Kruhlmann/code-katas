import { IItemHandler } from "./item_handler";
import { ItemHandlerFactory } from "./item_handler_factory";

interface IItem {
    name: string;
    sellIn: number;
    quality: number;
}

export interface IUpdateableItem extends IItem {
    handler: IItemHandler;
}

class Item implements IItem {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class UpdateableItem extends Item implements IUpdateableItem {
    public readonly handler: IItemHandler;

    public constructor(name: string, sellIn: number, quality: number) {
        super(name, sellIn, quality);
        this.handler = new ItemHandlerFactory().create_item_handler_from_item(this);
    }
}
