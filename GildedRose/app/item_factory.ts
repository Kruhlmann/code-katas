import { AgedBrie } from "./aged_brie";
import { BackstagePass } from "./backstage_pass";
import { GenericItemHandler, IItem } from "./item";
import { LookupTable } from "./lookup_table";
import { SpecialItemNames } from "./special_item_names";
import { Sulfuras } from "./sulfuras";

class ItemHandlerFactoryLookupTable extends LookupTable<(name: string, sell_in: number, quality: number) => IItem> {
    protected lookup_table = {
        [SpecialItemNames.AGED_BRIE]: (name: string, sell_in: number, quality: number) =>
            new AgedBrie(name, sell_in, quality),
        [SpecialItemNames.BACKSTAGE_PASS]: (name: string, sell_in: number, quality: number) =>
            new BackstagePass(name, sell_in, quality),
        [SpecialItemNames.SULFURAS_HAND_OF_RAGNAROS]: (name: string, sell_in: number, quality: number) =>
            new Sulfuras(name, sell_in, quality),
    };
    protected default_value = (name: string, sell_in: number, quality: number) =>
        new GenericItemHandler(name, sell_in, quality);
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
    private item_constructor_lookup_table: ItemHandlerFactoryLookupTable;
    private string_to_special_name_lookup_table: SpecialItemNamesLookupTable;

    public constructor(configuration: Record<string, string>) {
        this.item_constructor_lookup_table = new ItemHandlerFactoryLookupTable();
        this.string_to_special_name_lookup_table = new SpecialItemNamesLookupTable(configuration);
    }

    public create_item(name: string, sell_in: number, quality: number): IItem {
        const converted_name = this.string_to_special_name_lookup_table.perform_lookup(name);
        const create_item = this.item_constructor_lookup_table.perform_lookup(converted_name);
        const instance = create_item(name, sell_in, quality);
        return instance;
    }
}
