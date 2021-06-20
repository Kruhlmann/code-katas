export interface IItem {
    name: string;
    sell_in: number;
    quality: number;
    update(): void;
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

    public set sell_in(value: number) {
        this._sell_in = value;
    }

    public abstract update(): void;
}

export class GenericItemHandler extends Item {
    private decrease_quality_if_non_zero(): void {
        if (this.quality > 0) {
            this.quality--;
        }
    }

    private decrease_quality_if_non_zero_and_is_expired() {
        const is_expired = this.sell_in < 0;
        if (is_expired) {
            this.decrease_quality_if_non_zero();
        }
    }
    public update(): void {
        this.decrease_quality_if_non_zero();
        this.sell_in = this.sell_in--;
        this.decrease_quality_if_non_zero_and_is_expired();
    }
}
