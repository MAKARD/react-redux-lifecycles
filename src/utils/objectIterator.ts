export function objectIterator(path: string, object: any) {
    let result;
    try {
        const splitted = path.split(".");
        result = splitted.reduce((passed, next) => {
            if (typeof passed !== "object") {
                throw new Error(`Evaluating ${next} in ${passed} was failed.`);
            }

            return passed[next];
        }, object);
    } catch (error) {
        throw new Error(`Unable to find value in path ${path}: ${error.message}`);
    }

    return result;
}
