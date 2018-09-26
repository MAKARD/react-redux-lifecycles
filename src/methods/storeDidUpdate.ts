const invariant = require("invariant");

export function storeDidUpdate<S = any>(
    storeState: S,
    instance?: { storeDidUpdate?: (storeState: S) => void },
    prototype?: { storeDidUpdate?: (storeState: S) => void }
) {
    if (prototype.storeDidUpdate) {
        invariant(instance,
            `To access the "storeDidUpdate" method, you need to specify ` +
            `{ withRef: true } in the options argument of the connect() call.`
        );
    }

    if (!instance || instance.storeDidUpdate === undefined) {
        return;
    }

    invariant((typeof instance.storeDidUpdate).toLowerCase() === "function",
        `You must initialize "storeDidUpdate" as a function, instead ` +
        `initialized as ${typeof instance.storeDidUpdate}.`
    );

    instance.storeDidUpdate.call(instance, storeState);
}
