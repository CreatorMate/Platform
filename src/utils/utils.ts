import {validateExample} from "@redocly/openapi-core/lib/rules/utils";

export function sortByKey<T>(list: T[], key: keyof T, desc: boolean = false, limit?: number) {
    const sortedList = list.slice().sort((a, b) => {
        const valueA = a[key];
        const valueB = b[key];

        if (valueA < valueB) return desc ? 1 : -1;
        if (valueA > valueB) return desc? -1 : 1;
        return 0;
    });

    return limit ? sortedList.slice(0, limit) : sortedList
}
export function sortKeyValueObject<T>(obj: Record<string, T>, limit?: number, descending: boolean = false): Record<string, T> {
    const sortedEntries = Object.entries(obj).sort(([, valueA], [, valueB]) => {
        if (valueA < valueB) return descending ? 1 : -1;
        if (valueA > valueB) return descending ? -1 : 1;
        return 0;
    });

    const limitedEntries = limit !== undefined ? sortedEntries.slice(0, limit) : sortedEntries;

    return Object.fromEntries(limitedEntries);
}

export function shorten(text: string, amount: number, devider: string = ' ') {
    if(!text) return text;
    const words = text.split(devider);
    let newText = '';
    for(const word of words.splice(0, amount)) {
        newText += `${word} `;
    }

    return `${newText}...`
}

export function shortenString(value: any, maxLength: number): any {
    if(typeof value === "string") {
        if (value.length > maxLength) {
            return value.slice(0, maxLength) + "...";
        }
        return value;
    }

    return value;
}

export function isUrl(value: any) {
    if(typeof value === "string") {
        return value.includes('https://');
    }

    return false;
}

export function sendTo(url: string) {
    window.open(url, '_blank')
}

export function stringToSlug(str: string) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}