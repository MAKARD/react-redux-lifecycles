import * as Redux from "redux";
import invariant from "invariant";

export function storeDidThrow<S = any>(store: Redux.Store<S>, instance?: { storeDidThrow?: (error: any) => void }) {
    if (!instance || instance.storeDidThrow === undefined) {
        return;
    }

    if ((typeof instance.storeDidThrow).toLowerCase() !== "function") {
        return invariant(instance.storeDidThrow,
            `You must initialize "storeDidThrow" as a function, instead ` +
            `received ${typeof instance.storeDidThrow}.`
        );
    }

    const dispatch = store.dispatch;

    store.dispatch = function (action) {
        let result;
        try {
            result = dispatch(action);
        } catch (error) {
            return instance.storeDidThrow(error);
        }
        return result;
    }
}
