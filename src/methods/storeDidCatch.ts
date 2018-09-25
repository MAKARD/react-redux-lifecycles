import * as Redux from "redux";
import invariant from "invariant";

export function storeDidCatch<S = any>(store: Redux.Store<S>, instance?: { storeDidCatch?: (error: any) => void }) {
    if (!instance || instance.storeDidCatch === undefined) {
        return;
    }

    if ((typeof instance.storeDidCatch).toLowerCase() !== "function") {
        return invariant(instance.storeDidCatch,
            `You must initialize "storeDidCatch" as a function, instead ` +
            `received ${typeof instance.storeDidCatch}.`
        );
    }

    const dispatch = store.dispatch;

    store.dispatch = function (action) {
        let result;
        try {
            result = dispatch(action);
        } catch (error) {
            return instance.storeDidCatch(error);
        }
        return result;
    }
}
