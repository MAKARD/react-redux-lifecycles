import * as React from "react";

export class WrappedComponent extends React.Component {
    public static storeDidUpdateCalled = false;

    public storeDidUpdate() {
        WrappedComponent.storeDidUpdateCalled = true;
    }

    public componentWillUnmount() {
        WrappedComponent.storeDidUpdateCalled = false;
    }

    public render(): React.ReactNode {
        return (
            <div>
                WrappedComponent
            </div>
        );
    }
}
