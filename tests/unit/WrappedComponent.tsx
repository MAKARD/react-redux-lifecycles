import * as React from "react";

export class WrappedComponent extends React.Component {
    public static storeDidUpdateCalled = false;
    public static storeDidUpdateStateCalled = false;

    public storeDidUpdate() {
        WrappedComponent.storeDidUpdateCalled = true;
    }

    public storeDidUpdateState() {
        WrappedComponent.storeDidUpdateStateCalled = true;
    }

    public componentWillUnmount() {
        WrappedComponent.storeDidUpdateCalled = false;
        WrappedComponent.storeDidUpdateStateCalled = false;
    }

    public render(): React.ReactNode {
        return (
            <div>
                WrappedComponent
            </div>
        );
    }
}
