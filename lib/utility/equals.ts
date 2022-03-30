export function equals(a : string[], b : string[]) {
    return a.length === b.length && a.every((elmnt, index) => {
        return elmnt === b[index];
    });
}