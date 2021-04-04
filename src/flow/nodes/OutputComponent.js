
import * as tf             from '@tensorflow/tfjs';
import Rete                from 'rete';
import { NUM_SOCKET }      from '../../viewFlow';
import Node                from '../../vue/Node';
import { NumberControl }   from '../NumberControl';
import { DropDownControl } from '../DropDownControl';

class OutputComponent extends Rete.Component
{
    constructor()
    {
        super('Output');
        this.data = {
            render: 'vue',
            component: Node
        };
        this.tfjsConstructor = tf.layers.dense;
    }

    builder(node)
    {
        let input = new Rete.Input('out', '', NUM_SOCKET);
        let control = new NumberControl(this.editor, 'size', 'Dimension', 'number', false, 10);
        let aControl = new DropDownControl(this.editor, 'a', 'Activation',
            ['softmax', 'sigmoid', 'linear', 'relu', 'tanh']
        );

        node.addInput(input);
        node.addControl(control);
        node.addControl(aControl);

        const color = 'rgb(85,126,19,0.8)';
        node.data.style = `${color} !important`;
    }

    worker(node, inputs, outputs)
    {
        // inputs.num = node.data.num;
        console.log('sink');
        console.log(node);
    }

    generateTFJSLayer()
    {
        const parameters = this.parameters;
        const parent = this.parent;
        this.tfjsLayer = this.tfjsConstructor(parameters).apply(parent.tfjsLayer);
    }

    generatePythonLine()
    {
        const parameters = this.parameters;
        const activation = this.activation;
        const activationText = `, activation='${activation}'`;
        return `Dense(${parameters.size}${activationText})`;
    }
}

export { OutputComponent };
