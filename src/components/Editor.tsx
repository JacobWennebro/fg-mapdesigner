import React, { Component } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import * as style from '../style/modules/Index.module.scss'
require('codemirror/mode/javascript/javascript');

interface Props {
    setValue: (e: string) => void;
    getValue: () => string;
}

interface State {
    editorValue: string
}

export default class Editor extends Component<Props, State> {

    constructor(props: Props) {
        super(props);


    }

    render() {
        return (
            <div>
                <CodeMirror
                    value={this.props.getValue()}
                    options={{
                        mode: 'javascript',
                        theme: 'dracula',
                        lineNumbers: true,
                        smartIndent: true
                    }}
                    onBeforeChange={(editor, data, value) => {
                        this.props.setValue(value);
                    }}
                    onChange={(editor, data, value) => {
                    }}
                />
            </div>
        )
    }
}
