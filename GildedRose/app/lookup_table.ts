type RecordKey = string | number;

class ReturnDefaultValueError extends Error {
    public name = "ReturnDefaultValueError";
}

export interface ILookupTable<LookupValueType> {
    perform_lookup(key: RecordKey): LookupValueType;
}

export abstract class LookupTable<LookupValueType> implements ILookupTable<LookupValueType> {
    protected abstract lookup_table: Record<string, LookupValueType>;
    protected abstract default_value: LookupValueType;

    private throw_default_value_error_if_undefined<ParameterType>(parameter?: ParameterType): void {
        if (parameter === undefined) {
            throw new ReturnDefaultValueError();
        }
    }

    private perform_lookup_or_throw_error(key: RecordKey): LookupValueType {
        this.throw_default_value_error_if_undefined(key);
        const value = this.lookup_table[key];
        this.throw_default_value_error_if_undefined(value);
        return value;
    }

    public perform_lookup(key: RecordKey): LookupValueType {
        try {
            return this.perform_lookup_or_throw_error(key);
        } catch {
            return this.default_value;
        }
    }
}
