/**
 * Comapares two arrays element for element.
 * @param a first array of strings
 * @param b second array of strings
 * @returns boolean - true if the arrays are equal
 */
export function equals(a : string[], b : string[]) : boolean{
    return a.length === b.length && a.every((elmnt, index) => {
        return elmnt === b[index];
    });
}