import { expect } from "chai";
import { GildedRose } from "../app/gilded-rose";
import { IItem } from "../app/item";
import { ItemHandlerFactory } from "../app/item_factory";
import { SpecialItemNames } from "../app/special_item_names";

const configuration = {
    "This is still Sulfuras, Hand of Ragnaros": SpecialItemNames.SULFURAS_HAND_OF_RAGNAROS,
};
const item_handler_factory = new ItemHandlerFactory(configuration);
const items: IItem[] = [
    item_handler_factory.create_item("+5 Dexterity Vest", 10, 20), //
    item_handler_factory.create_item("Aged Brie", 2, 0), //
    item_handler_factory.create_item("Elixir of the Mongoose", 5, 7), //
    item_handler_factory.create_item("Sulfuras, Hand of Ragnaros", 0, 80), //
    item_handler_factory.create_item("Sulfuras, Hand of Ragnaros", -1, 80),
    item_handler_factory.create_item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    item_handler_factory.create_item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    item_handler_factory.create_item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    // this conjured item does not work properly yet
    item_handler_factory.create_item("Conjured Mana Cake", 3, 6),
    item_handler_factory.create_item("This is still Sulfuras, Hand of Ragnaros", -1, 80),
];
let store: GildedRose;

describe("Gilded Rose", function () {
    beforeEach(() => {
        store = new GildedRose(items);
    });

    it("Updates items after 1 iteration", () => {
        store.updateQuality();
        expect(items[0].name).to.equal("+5 Dexterity Vest");
        expect(items[1].name).to.equal("Aged Brie");
        expect(items[2].name).to.equal("Elixir of the Mongoose");
        expect(items[3].name).to.equal("Sulfuras, Hand of Ragnaros");
        expect(items[4].name).to.equal("Sulfuras, Hand of Ragnaros");
        expect(items[5].name).to.equal("Backstage passes to a TAFKAL80ETC concert");
        expect(items[6].name).to.equal("Backstage passes to a TAFKAL80ETC concert");
        expect(items[7].name).to.equal("Backstage passes to a TAFKAL80ETC concert");
        expect(items[8].name).to.equal("Conjured Mana Cake");
        expect(items[9].name).to.equal("This is still Sulfuras, Hand of Ragnaros");

        expect(items[0].quality).to.equal(19);
        expect(items[1].quality).to.equal(1);
        expect(items[2].quality).to.equal(6);
        expect(items[3].quality).to.equal(80);
        expect(items[4].quality).to.equal(80);
        expect(items[5].quality).to.equal(21);
        expect(items[6].quality).to.equal(50);
        expect(items[7].quality).to.equal(50);
        expect(items[8].quality).to.equal(5);
        expect(items[9].quality).to.equal(80);

        expect(items[0].sell_in).to.equal(9);
        expect(items[1].sell_in).to.equal(1);
        expect(items[2].sell_in).to.equal(4);
        expect(items[3].sell_in).to.equal(0);
        expect(items[4].sell_in).to.equal(-1);
        expect(items[5].sell_in).to.equal(14);
        expect(items[6].sell_in).to.equal(9);
        expect(items[7].sell_in).to.equal(4);
        expect(items[8].sell_in).to.equal(2);
        expect(items[9].sell_in).to.equal(-1);
    });
});
