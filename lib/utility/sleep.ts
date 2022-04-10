/**
 * Async timeout function
 * @param ms milliseconds to sleep
 */
export function sleep(ms : number) {
    return new Promise((resolve : any) => {
        setTimeout(resolve, ms);
    });
}