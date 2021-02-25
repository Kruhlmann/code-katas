export class Item {
    public name: string;
    public quality: number;
    public sellIn: number;

    public constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }

    public update(): void {}
}

class SellableItem extends Item {
    public min_quality = 0;
    public max_quality = 50;
    public has_expired = false;
    protected modification_rate = 0;

    public update(): void {
        this.sellIn--;
        this.update_quality();
        this.update_expiration();
    }

    protected update_expiration(): void {
        const should_expire = this.sellIn <= 0 && !this.has_expired;
        if (should_expire) {
            this.expire();
        }
    }

    protected get_updated_quality(): number {
        return this.quality + this.modification_rate;
    }

    protected set_quality(quality: number): void {
        if (quality > this.max_quality) {
            quality = this.max_quality;
        }
        if (quality < this.min_quality) {
            quality = this.min_quality;
        }
        this.quality = quality;
    }

    protected update_quality(): void {
        let new_quality = this.get_updated_quality();
        this.set_quality(new_quality);
    }

    protected expire() {
        this.has_expired = true;
        this.modification_rate = this.modification_rate * 2;
    }
}

export class DegradingItem extends SellableItem {
    protected modification_rate = -1;
}

export class ImprovingItem extends SellableItem {
    protected modification_rate = 1;
}

export class ConjuredItem extends DegradingItem {
    protected modification_rate = -2;
}

export class ConcertTicketItem extends ImprovingItem {
    protected update_modification_rate(): void {
        if (this.sellIn <= 10) {
            this.modification_rate = 2;
        }
        if (this.sellIn <= 5) {
            this.modification_rate = 3;
        }
    }

    protected update_quality(): void {
        this.update_modification_rate();
        const concert_is_over = this.sellIn < 0;
        if (concert_is_over) {
            this.set_quality(0);
        } else {
            super.update_quality();
        }
    }
}

export class LegendaryItem extends Item {
    public static readonly static_item_quality = 80;

    public constructor(name: string) {
        super(name, 0, LegendaryItem.static_item_quality);
    }
}
