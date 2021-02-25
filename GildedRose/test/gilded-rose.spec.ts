import { expect } from "chai";
import { GildedRose } from "../app/gilded-rose";
import {
    ConcertTicketItem,
    ConjuredItem,
    DegradingItem,
    ImprovingItem,
    LegendaryItem,
} from "../app/item";

describe("Gilded Rose", function () {
    it("should degrade items", () => {
        const item = new DegradingItem("Item", 50, 50);
        for (let i = 0; i < 49; i++) {
            item.update();
        }
        expect(item.sellIn).to.equal(1);
        expect(item.quality).to.equal(1);
        expect(item.has_expired).to.equal(false);
    });

    it("should improve items", () => {
        const item = new ImprovingItem("Item", 50, 0);
        for (let i = 0; i < 49; i++) {
            item.update();
        }
        expect(item.sellIn).to.equal(1);
        expect(item.quality).to.equal(49);
        expect(item.has_expired).to.equal(false);
    });

    it("should expire items", () => {
        const item = new DegradingItem("Item", 50, 50);
        for (let i = 0; i < 51; i++) {
            item.update();
        }
        expect(item.sellIn).to.equal(-1);
        expect(item.quality).to.equal(0);
        expect(item.has_expired).to.equal(true);
    });

    it("should degrade items twice as fast after expiring", () => {
        const item = new DegradingItem("Item", 0, 100);
        for (let i = 0; i < 50; i++) {
            item.update();
        }
        expect(item.sellIn).to.equal(-50);
        expect(item.quality).to.equal(0);
        expect(item.has_expired).to.equal(true);
    });

    it("should improve items twice as fast after expiring", () => {
        const item = new ImprovingItem("Item", 0, 0);
        for (let i = 0; i < 50; i++) {
            item.update();
        }
        expect(item.sellIn).to.equal(-50);
        expect(item.quality).to.equal(50);
        expect(item.has_expired).to.equal(true);
    });

    it("should not modify legendary items", () => {
        const item = new LegendaryItem("Item");
        item.update();
        expect(item.name).to.equal("Item");
        expect(item.quality).to.equal(LegendaryItem.static_item_quality);
    });

    it("should degrade conjured items twice as fast", () => {
        const item = new ConjuredItem("Item", 50, 100);
        for (let i = 0; i < 50; i++) {
            item.update();
        }
        expect(item.sellIn).to.equal(0);
        expect(item.quality).to.equal(0);
    });

    it("should degrade conjured items four times as fast", () => {
        const item = new ConjuredItem("Item", 0, 100);
        for (let i = 0; i < 25; i++) {
            item.update();
        }
        expect(item.sellIn).to.equal(-25);
        expect(item.quality).to.equal(0);
    });

    it("should improve concert tickets", () => {
        const item = new ConcertTicketItem("Item", 100, 0);
        for (let i = 0; i < 25; i++) {
            item.update();
        }
        expect(item.sellIn).to.equal(75);
        expect(item.quality).to.equal(25);
    });

    it("should improve concert tickets twice as fast when there are 10 days to the concert", () => {
        const item = new ConcertTicketItem("Item", 10, 0);
        for (let i = 0; i < 4; i++) {
            item.update();
        }
        expect(item.sellIn).to.equal(6);
        expect(item.quality).to.equal(8);
    });

    it("should improve concert tickets three times as fast when there are 5 days to the concert", () => {
        const item = new ConcertTicketItem("Item", 5, 0);
        for (let i = 0; i < 5; i++) {
            item.update();
        }
        expect(item.sellIn).to.equal(0);
        expect(item.quality).to.equal(15);
    });

    it("should remove the quality concert tickets the day after they've expired", () => {
        const item = new ConcertTicketItem("Item", 5, 0);
        for (let i = 0; i < 6; i++) {
            item.update();
        }
        expect(item.sellIn).to.equal(-1);
        expect(item.quality).to.equal(0);
    });
});
