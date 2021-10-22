import React, { Component } from 'react'

interface State {
    zoom: number
}

export default class Resizer extends Component<{}, State> {

    constructor(props: {}) {
        super(props);

        this.state = {
            zoom: 40
        }

        this.zoom = this.zoom.bind(this);
    }

    zoom(amount: number) {
        this.setState({ zoom: this.state.zoom + amount });
    }

    componentDidUpdate() {
        document.body.setAttribute("style", `--tile-size: ${this.state.zoom}px`);
    }

    componentDidMount() {
        document.body.addEventListener("keydown", e => {
            const zoomIn = e.key === "+" && e.ctrlKey;
            const zoomOut = e.key === "-" && e.ctrlKey;

            if(zoomIn) {
                this.setState({ zoom: this.state.zoom + 5 });
                e.preventDefault();
            } else if(zoomOut) {
                this.setState({ zoom: this.state.zoom - 5 });
                e.preventDefault();
            }


        });
    }

    render() {
        return (
            <div className="resizer">
                <div>
                    <button onClick={() => this.zoom(1)}>+</button>
                    <button onClick={() => this.zoom(-1)}>-</button>
                </div>
                <p>{this.state.zoom}px/tile</p>
            </div>
        )
    }
}
