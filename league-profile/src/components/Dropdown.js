import React, { Component, createRef } from "react";

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.mounted = true;
    this.rootNode = createRef();
    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    document.addEventListener("click", this.handleDocumentClick, false);
    document.addEventListener("touchend", this.handleDocumentClick, false);
    if (this.props.close) {
      this.props.close(() => {
        this.setState({ isOpen: false });
      });
    }
  }
  componentWillUnmount() {
    this.mounted = false;
    document.removeEventListener("click", this.handleDocumentClick, false);
    document.removeEventListener("touchend", this.handleDocumentClick, false);
  }

  handleDocumentClick = (event) => {
    if (this.mounted) {
      if (!this.rootNode.current.contains(event.target)) {
        if (this.state.isOpen) {
          this.setState({ isOpen: false });
        }
      }
    }
  };

  collapse = () => {
    this.setState({ isOpen: false });
  };
  render() {
    const { isOpen } = this.state;
    const { left } = this.props;
    return (
      <div className={"dropdown-base"} ref={this.rootNode}>
        <div onClick={() => this.setState({ isOpen: !isOpen })}>
          {this.props.element}
        </div>
        {isOpen && (
          <div
            className={"drop-down-container"}
            style={left ? { left } : { right: 0 }}
          >
            {this.props.container}
          </div>
        )}
      </div>
    );
  }
}
