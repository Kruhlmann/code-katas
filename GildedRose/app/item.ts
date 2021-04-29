export interface IItem {
    name: string;
    sell_in: number;
    quality: number;
    update(): void;
    update_expiration(): void;
    update_quality(): void;
    increase_quality(): void;
    decrease_quality(): void;
    update_sell_in_date(): void;
    decrease_quality_if_non_zero(): void;
}

export abstract class Item implements IItem {
    protected readonly MAX_QUALITY = 50;
    private _name: string;
    private _sell_in: number;
    private _quality: number;

    public constructor(name: string, sell_in: number, quality: number) {
        this._name = name;
        this._sell_in = sell_in;
        this._quality = quality;
    }

    public get name(): string {
        return this._name;
    }

    public get sell_in(): number {
        return this._sell_in;
    }

    public get quality(): number {
        return this._quality;
    }

    public set quality(value: number) {
        this._quality = value;
    }

    public update(): void {
        this.update_quality();
        this.update_sell_in_date();
    }

    public increase_item_quality_if_not_max(): void {
        if (this._quality < this.MAX_QUALITY) {
            this.increase_quality();
        }
    }

    public increase_quality(): void {
        this._quality++;
    }

    public decrease_quality(): void {
        this._quality--;
    }

    public update_sell_in_date(): void {
        this._sell_in--;
        this.update_expiration_if_not_expired();
    }

    public decrease_quality_if_non_zero(): void {
        if (this._quality > 0) {
            this.decrease_quality();
        }
    }

    public is_expired(): boolean {
        return this._sell_in < 0;
    }

    public update_expiration_if_not_expired(): void {
        if (this.is_expired()) {
            this.update_expiration();
        }
    }

    public abstract update_expiration(): void;
    public abstract update_quality(): void;
}

export class GenericItemHandler extends Item {
    public update_expiration(): void {
        this.decrease_quality_if_non_zero();
    }

    public update_quality(): void {
        this.decrease_quality_if_non_zero();
    }
}
