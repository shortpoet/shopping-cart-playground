import React from "react";
export interface HeaderProps {
  storeName: string;
}

export class StoreHeader extends React.Component<HeaderProps, {}> {
  render(): React.ReactNode {
    return <header className="store-header">{this.props.storeName}</header>;
  }
}
