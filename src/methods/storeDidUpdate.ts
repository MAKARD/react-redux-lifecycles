import { isMethodValid } from "../utils/isMethodValid";

export function storeDidUpdate<S = any>(
    storeState: S,
    instance?: { storeDidUpdate?: (storeState: S) => void },
    prototype?: { storeDidUpdate?: (storeState: S) => void }
) {
    isMethodValid(instance, prototype, "storeDidUpdate") && instance.storeDidUpdate.call(instance, storeState);
}
