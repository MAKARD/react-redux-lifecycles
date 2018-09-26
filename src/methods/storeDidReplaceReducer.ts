import * as Redux from "redux";
import invariant from "invariant";

export function storeDidReplaceReducer<S = any>
    (store: Redux.Store<S>, instance?: { storeDidReplaceReducer?: () => void }) {
    if (!instance || instance.storeDidReplaceReducer === undefined) {
        return;
    }

    if ((typeof instance.storeDidReplaceReducer).toLowerCase() !== "function") {
        return invariant(instance.storeDidReplaceReducer,
            `You must initialize "storeDidReplaceReducer" as a function, instead ` +
            `received ${typeof instance.storeDidReplaceReducer}.`
        );
    }

    const replaceReducer = store.replaceReducer;

    store.replaceReducer = function (newReducer) {
        replaceReducer(newReducer);

        instance.storeDidReplaceReducer();
    }
}
