export function dedupeA<T>(arr: T[]): T[] {
    return arr.reduce(dedupe, []);

    function dedupe<TT>(all: TT[], cur: any): TT[] {
        if (all.includes(cur)) {
            return all;
        }
        return all.concat(cur);
    }
}

// TODO: make a version that uses the interface to chose the properties taken
export function omit<T>(key: string, obj: any): T {
    const cleanObj: any = {};

    for (const property in obj) {
        if (property !== key) {
            cleanObj[property] = obj[property];
        }
    }

    return cleanObj;
}
