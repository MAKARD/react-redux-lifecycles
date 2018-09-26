import { isMethodValid } from "../utils/isMethodValid";
import deepEqual from "deep-equal";

import { objectIterator } from "../utils/objectIterator";

export function storeDidUpdateState<S = any>(
    prevStoreState: S,
    currentStoreState: S,
    selectors: Array<string>,
    instance?: { storeDidUpdateState?: (storeState: S) => void },
    prototype?: { storeDidUpdateState?: (storeState: S) => void }
) {
    if (isMethodValid(instance, prototype, "storeDidUpdateState")) {
        return;
    }

    selectors.some((path) => {
        return !deepEqual(objectIterator(path, prevStoreState), objectIterator(path, currentStoreState))
    }) && instance.storeDidUpdateState(currentStoreState);

}
