import * as React from "react";

export class WrappedComponent extends React.Component {
    public static storeDidUpdateCalled = false;
    public static storeDidCatchCalled = false;

    public storeDidUpdate() {
        WrappedComponent.storeDidUpdateCalled = true;
    }

    public storeDidCatch() {
        WrappedComponent.storeDidCatchCalled = true;
    }

    public componentWillUnmount() {
        WrappedComponent.storeDidUpdateCalled = false;
        WrappedComponent.storeDidCatchCalled = false;
    }

    public render(): React.ReactNode {
        return (
            <div>
                WrappedComponent
            </div>
        );
    }
}
