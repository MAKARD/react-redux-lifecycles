import { isMethodValid } from "../utils/isMethodValid";
const deepEqual = require("deep-equal");

import { objectIterator } from "../utils/objectIterator";

export function storeDidUpdateState<S = any>(
    currentStoreState: S,
    prevStoreState: S,
    selectors: Array<string>,
    instance?: { storeDidUpdateState?: (storeState: S) => void },
    prototype?: { storeDidUpdateState?: (storeState: S) => void }
) {
    if (!isMethodValid(instance, prototype, "storeDidUpdateState")) {
        return;
    }

    selectors.some((path) => !deepEqual(
        objectIterator(path, prevStoreState),
        objectIterator(path, currentStoreState)
    )) && instance.storeDidUpdateState(currentStoreState);
}
