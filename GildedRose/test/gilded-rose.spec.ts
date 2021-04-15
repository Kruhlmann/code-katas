import { expect } from "chai";
import { GildedRose } from "../app/gilded-rose";
import { UpdateableItem } from "../app/item";
import { SpecialItemNames } from "../app/special_item_names";

//-------- day 0 --------
//name, sellIn, quality
//+5 Dexterity Vest 10 20
//Aged Brie 2 0
//Elixir of the Mongoose 5 7
//Sulfuras, Hand of Ragnaros 0 80
//Sulfuras, Hand of Ragnaros -1 80
//Backstage passes to a TAFKAL80ETC concert 15 20
//Backstage passes to a TAFKAL80ETC concert 10 49
//Backstage passes to a TAFKAL80ETC concert 5 49
//Conjured Mana Cake 3 6

//-------- day 1 --------
//name, sellIn, quality
//+5 Dexterity Vest 9 19
//Aged Brie 1 1
//Elixir of the Mongoose 4 6
//Sulfuras, Hand of Ragnaros 0 80
//Sulfuras, Hand of Ragnaros -1 80
//Backstage passes to a TAFKAL80ETC concert 14 21
//Backstage passes to a TAFKAL80ETC concert 9 50
//Backstage passes to a TAFKAL80ETC concert 4 50
//Conjured Mana Cake 2 5

const configuration = {
    "This is still Sulfuras, Hand of Ragnaros": SpecialItemNames.SULFURAS_HAND_OF_RAGNAROS,
};
const items: UpdateableItem[] = [
    new UpdateableItem("+5 Dexterity Vest", 10, 20, configuration), //
    new UpdateableItem("Aged Brie", 2, 0, configuration), //
    new UpdateableItem("Elixir of the Mongoose", 5, 7, configuration), //
    new UpdateableItem("Sulfuras, Hand of Ragnaros", 0, 80, configuration), //
    new UpdateableItem("Sulfuras, Hand of Ragnaros", -1, 80, configuration),
    new UpdateableItem("Backstage passes to a TAFKAL80ETC concert", 15, 20, configuration),
    new UpdateableItem("Backstage passes to a TAFKAL80ETC concert", 10, 49, configuration),
    new UpdateableItem("Backstage passes to a TAFKAL80ETC concert", 5, 49, configuration),
    // this conjured item does not work properly yet
    new UpdateableItem("Conjured Mana Cake", 3, 6, configuration),
    new UpdateableItem("This is still Sulfuras, Hand of Ragnaros", -1, 80, configuration),
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

        expect(items[0].sellIn).to.equal(9);
        expect(items[1].sellIn).to.equal(1);
        expect(items[2].sellIn).to.equal(4);
        expect(items[3].sellIn).to.equal(0);
        expect(items[4].sellIn).to.equal(-1);
        expect(items[5].sellIn).to.equal(14);
        expect(items[6].sellIn).to.equal(9);
        expect(items[7].sellIn).to.equal(4);
        expect(items[8].sellIn).to.equal(2);
        expect(items[9].sellIn).to.equal(-1);
    });
});
