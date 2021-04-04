
import * as tf             from '@tensorflow/tfjs';
import Rete                from 'rete';
import Node                from '../../vue/Node';
import { NUM_SOCKET }      from '../../viewFlow';
import { NumberControl }   from '../NumberControl';
import { DropDownControl } from '../DropDownControl';

class FlattenComponent extends Rete.Component
{
    constructor()
    {
        super('Flatten');
        this.data = {
            render: 'vue',
            component: Node
        };
    }

    builder(node)
    {
        let input = new Rete.Input('cin', 'in', NUM_SOCKET);
        let out = new Rete.Output('conv', 'out', NUM_SOCKET);

        node.addInput(input);
        node.addOutput(out);

        const color = 'rgb(97, 18, 140, 0.8)';
        node.data.style = `${color} !important`;
    }

    worker(node, inputs, outputs)
    {
        // outputs.conv2d = node.data.conv2d;
        // console.log(`conv2d processing with activation ${this.aControl.getValue()}`);
    }

    generateTFJSLayer()
    {
        const parameters = this.parameters;
        const parent = this.parent;
        this.tfjsLayer = this.tfjsConstructor(parameters).apply(parent.tfjsLayer);
    }

    generatePythonLine()
    {
        return 'Flatten()';
    }
}

class DropoutComponent extends Rete.Component
{
    constructor()
    {
        super('Dropout');
        this.data = {
            render: 'vue',
            component: Node
        };
        this.tfjsConstructor = tf.layers.dropout;
    }

    builder(node)
    {
        let input = new Rete.Input('cin', 'in', NUM_SOCKET);
        let out = new Rete.Output('conv', 'out', NUM_SOCKET);

        let rControl = new NumberControl(this.editor, 'r', 'Rate', 'number', false, 0.5);

        node.addInput(input);
        node.addControl(rControl);
        node.addOutput(out);

        const color = 'rgb(97, 18, 140, 0.8)';
        node.data.style = `${color} !important`;
    }

    worker(node, inputs, outputs)
    {
        // outputs.conv2d = node.data.conv2d;
        // console.log(`add processing with activation ${this.aControl.getValue()}`);
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
        return `Dropout(rate=${parameters.rate})`;
    }
}

class BatchNormalizationComponent extends Rete.Component
{
    constructor()
    {
        super('Batch Norm.');
        this.data = {
            render: 'vue',
            component: Node
        };
        this.tfjsConstructor = tf.layers.batchNormalization;
    }

    builder(node)
    {
        let input = new Rete.Input('cin', 'in', NUM_SOCKET);
        let out = new Rete.Output('conv', 'out', NUM_SOCKET);

        let mControl = new NumberControl(this.editor, 'r', 'Momentum', 'number', false, 0.99);
        let aControl = new DropDownControl(this.editor, 'a', 'Activation',
            ['linear', 'relu']
        );
        this.aControl = aControl;

        node.addInput(input);
        node.addControl(mControl);
        node.addControl(aControl);
        node.addOutput(out);

        const color = 'rgb(97, 18, 140, 0.8)';
        node.data.style = `${color} !important`;
    }

    worker(node, inputs, outputs)
    {
        // outputs.conv2d = node.data.conv2d;
        console.log(`normalize processing with activation ${this.aControl.getValue()}`);
    }

    generateTFJSLayer()
    {
        const parameters = this.parameters;
        const parent = this.parent;
        this.tfjsLayer = this.tfjsConstructor(parameters).apply(parent.tfjsLayer);
        const activation = this.activation;
        if (activation !== 'linear')
        {
            // Only reLU supported for batch normalization
            this.tfjsLayer = tf.layers.reLU().apply(this.tfjsLayer);
        }
    }

    generatePythonLine()
    {
        const parameters = this.parameters;
        return `BatchNormalization(momentum=${parameters.momentum})`;
    }
}

export {
    BatchNormalizationComponent,
    DropoutComponent,
    FlattenComponent
};
