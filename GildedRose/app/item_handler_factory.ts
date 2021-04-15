import { AgedBrie } from "./aged_brie";
import { BackstagePass } from "./backstage_pass";
import { IUpdateableItem } from "./item";
import { GenericItemHandler, IItemHandler } from "./item_handler";
import { LookupTable } from "./lookup_table";
import { SpecialItemNames } from "./special_item_names";
import { Sulfuras } from "./sulfuras";

class ItemHandlerFactoryLookupTable extends LookupTable<(item: IUpdateableItem) => IItemHandler> {
    protected lookup_table = {
        [SpecialItemNames.AGED_BRIE]: (item: IUpdateableItem) => new AgedBrie(item),
        [SpecialItemNames.BACKSTAGE_PASS]: (item: IUpdateableItem) => new BackstagePass(item),
        [SpecialItemNames.SULFURAS_HAND_OF_RAGNAROS]: (item: IUpdateableItem) => new Sulfuras(item),
    };
    protected default_value = (item: IUpdateableItem) => new GenericItemHandler(item);
}

export class ItemHandlerFactory {
    private lookup_table = new ItemHandlerFactoryLookupTable();

    public create_item_handler_from_item(item: IUpdateableItem): IItemHandler {
        const create_item_handler = this.lookup_table.perform_lookup(item.name);
        const instance = create_item_handler(item);
        return instance;
    }
}
