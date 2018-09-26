import * as React from "react";

export class WrappedComponent extends React.Component {
    public static storeDidReplaceReducerCalled = false;
    public static storeDidUpdateCalled = false;
    public static storeDidThrowCalled = false;

    public storeDidUpdate() {
        WrappedComponent.storeDidUpdateCalled = true;
    }

    public storeDidThrow() {
        WrappedComponent.storeDidThrowCalled = true;
    }

    public storeDidReplaceReducer() {
        WrappedComponent.storeDidReplaceReducerCalled = true;
    }

    public componentWillUnmount() {
        WrappedComponent.storeDidReplaceReducerCalled = false;
        WrappedComponent.storeDidUpdateCalled = false;
        WrappedComponent.storeDidThrowCalled = false;
    }

    public render(): React.ReactNode {
        return (
            <div>
                WrappedComponent
            </div>
        );
    }
}
