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

class SpecialItemNamesLookupTable extends LookupTable<string> {
    protected lookup_table: Record<string, string>;
    protected default_value = "";

    public constructor(configuration: Record<string, string>) {
        super();
        this.lookup_table = configuration;
        const all_special_names = SpecialItemNames.get_all_special_names();
        for (const special_item_name of all_special_names) {
            this.lookup_table[special_item_name] = special_item_name;
        }
    }
}

export class ItemHandlerFactory {
    private item_handler_constructor_lookup_table: ItemHandlerFactoryLookupTable;
    private string_to_special_name_lookup_table: SpecialItemNamesLookupTable;

    public constructor(configuration: Record<string, string>) {
        this.item_handler_constructor_lookup_table = new ItemHandlerFactoryLookupTable();
        this.string_to_special_name_lookup_table = new SpecialItemNamesLookupTable(configuration);
    }

    public create_item_handler_from_item(item: IUpdateableItem): IItemHandler {
        const converted_name = this.string_to_special_name_lookup_table.perform_lookup(item.name);
        const create_item_handler = this.item_handler_constructor_lookup_table.perform_lookup(converted_name);
        const instance = create_item_handler(item);
        return instance;
    }
}
