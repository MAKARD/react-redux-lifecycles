const invariant = require("invariant");

export function isMethodValid(instance: any, prototype: any, methodName: string): boolean | never {
    if (prototype[methodName]) {
        invariant(instance,
            `To access the "${methodName}" method, you need to specify ` +
            `{ withRef: true } in the options argument of the connect() call.`
        );
    }

    if (!instance || instance[methodName] === undefined) {
        return false;
    }

    invariant((typeof instance[methodName]).toLowerCase() === "function",
        `You must initialize "${methodName}" as a function, instead ` +
        `initialized as ${typeof instance[methodName]}.`
    );

    return true;
}
