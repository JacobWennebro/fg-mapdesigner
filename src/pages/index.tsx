import React, { Component } from 'react'
import * as style from '../style/modules/Index.module.scss'
import '../style/global.scss'
import Editor from '../components/Editor'
import '../style/tiles.scss'
import Draggable from 'react-draggable'
import Resizer from '../components/Resizer'

interface Props {

}

interface State {
  editorValue: string
}

export default class index extends Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      editorValue: `{
        "spawn": [5, 4],
        "tiles": [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 5, 5, 5, 0, 0, 0, 0, 0, 0],
            [0, 5, 5, 5, 0, 0, 0, 0, 0, 0],
            [0, 5, 5, 5, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 3, 4, 1, 1, 1, 1],
            [1, 1, 1, 1, 3, 4, 1, 1, 1, 1],
            [2, 2, 2, 2, 3, 4, 2, 2, 2, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ]
    }`
    }

    this.setValue = this.setValue.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  setValue(editorValue: string) {
    this.setState({ editorValue });
  }

  getValue() {
    return this.state.editorValue;
  }

  getTileName(int: number) {
    switch (int) {
      case 0:
        return "grass";
      case 1:
        return "wall";
      case 2:
        return "wall-bottom";
      case 3:
        return "stair-left";
      case 4:
        return "stair-right";
      case 5:
        return "water";
    }
  }

  render() {

    const Tiles = [];

    try {
      const parsed = JSON.parse(this.state.editorValue);

      for (let y = 0; y < parsed.tiles.length; y++) {
        const tiles = parsed.tiles[y];
        for (let x = 0; x < tiles.length; x++) {
          Tiles.push(
            <div data-tile-type={tiles[x]} data-x={x} data-y={y} tabIndex={1} key={Math.random() + parsed.tiles[y].toString() + tiles[x]} className={"game__view__map__container__tile render-as-pixels " + this.getTileName(tiles[x]) + ` ${(parsed.spawn[0] == x && parsed.spawn[1] == y) ? "spawnpoint" : ""}`}></div>
          )
        }
      }
    } catch (e) {
      console.error("Invalid format");
    }

    return (
      <div className={style.App}>
        <main className={style.Main}>
          <Editor getValue={this.getValue} setValue={this.setValue} />
          <div className={style.View}>
            <div className={style.ViewOverlay}>
              <Resizer />
            </div>
            <div className="game">
              <div className="game__view">
                {Tiles.length > 0 ? (
                  <Draggable bounds="parent">
                    <div className="game__view__map">
                      <div className="game__view__map__container" style={{ transform: `translate(${5 * -1 * 75}px, ${5 * -1 * 75}px)` }}>
                        {Tiles.map(T => T)}
                      </div>
                    </div>
                  </Draggable>
                ) : (
                  <div style={{padding: "1rem"}}>
                    <h2>Invalid JSON format</h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}
