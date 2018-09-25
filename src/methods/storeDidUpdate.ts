import invariant from "invariant";

export function storeDidUpdate<S = any>(storeState: S, instance?: { storeDidUpdate?: (storeState: S) => void }) {
    if (!instance || instance.storeDidUpdate === undefined) {
        return;
    }

    if ((typeof instance.storeDidUpdate).toLowerCase() !== "function") {
        return invariant(instance.storeDidUpdate,
            `You must initialize "storeDidUpdate" as a function, instead ` +
            `received ${typeof instance.storeDidUpdate}.`
        );
    }

    instance.storeDidUpdate(storeState);
}
