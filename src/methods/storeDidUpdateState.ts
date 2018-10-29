import { isMethodValid } from "../utils/isMethodValid";
const deepEqual = require("deep-equal");

import { objectIterator } from "../utils/objectIterator";

export function storeDidUpdateState<S = any>(
    prevStoreState: S,
    currentStoreState: S,
    selectors: Array<string>,
    instance?: { storeDidUpdateState?: (currentStoreState: S, prevStoreState: S) => void },
    prototype?: { storeDidUpdateState?: (currentStoreState: S, prevStoreState: S) => void }
) {
    if (!isMethodValid(instance, prototype, "storeDidUpdateState")) {
        return;
    }

    selectors.some((path) => !deepEqual(
        objectIterator(path, prevStoreState),
        objectIterator(path, currentStoreState)
    )) && instance.storeDidUpdateState(currentStoreState, prevStoreState);
}
