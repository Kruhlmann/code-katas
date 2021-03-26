import { AgedBrie } from "./aged_brie";
import { BackstagePass } from "./backstage_pass";
import { UpdateableItem } from "./item";
import { GenericItemHandler, IItemHandler } from "./item_handler";
import { SpecialItemNames } from "./special_item_names";
import { Sulfuras } from "./sulfuras";

export class ItemHandlerFactory {
    public create_item_handler_from_item(item: UpdateableItem): IItemHandler {
        switch (item.name) {
            case SpecialItemNames.AGED_BRIE:
                return new AgedBrie(item);
            case SpecialItemNames.BACKSTAGE_PASS:
                return new BackstagePass(item);
            case SpecialItemNames.SULFURAS_HAND_OF_RAGNAROS:
                return new Sulfuras(item);
            default:
                return new GenericItemHandler(item);
        }
    }
}
