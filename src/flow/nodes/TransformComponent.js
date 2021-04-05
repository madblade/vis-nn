
import * as tf             from '@tensorflow/tfjs';
import Rete                from 'rete';
import Node                from '../../vue/Node';
import { NUM_SOCKET }      from '../../viewFlow';
import { NumberControl }   from '../NumberControl';
import { DropDownControl } from '../DropDownControl';

class FlattenComponent extends Rete.Component
{
    constructor(editor, pythonArchitecture)
    {
        super('Flatten');
        this.data = {
            render: 'vue',
            component: Node
        };
        this.editor = editor;
        this.pythonArchitecture = pythonArchitecture;
    }

    builder(node)
    {
        let input = new Rete.Input('parent', 'in', NUM_SOCKET);
        let out = new Rete.Output('child', 'out', NUM_SOCKET);

        node.addInput(input);
        node.addOutput(out);

        const color = 'rgb(97, 18, 140, 0.8)';
        node.data.style = `${color} !important`;
    }

    worker(node, inputs, outputs)
    {
        const parents = inputs.parent;
        if (!parents || parents.length < 1) return;
        const parent = parents[0];
        if (!parent.dataset) return;

        outputs.child = this;
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
    constructor(editor, pythonArchitecture)
    {
        super('Dropout');
        this.data = {
            render: 'vue',
            component: Node
        };
        this.parent = null;
        this.tfjsConstructor = tf.layers.dropout;
        this.editor = editor;
        this.pythonArchitecture = pythonArchitecture;
    }

    builder(node)
    {
        let input = new Rete.Input('parent', 'in', NUM_SOCKET);
        let out = new Rete.Output('child', 'out', NUM_SOCKET);

        let rControl = new NumberControl(this.editor, 'r', 'Rate', 'number', false, 0.5);

        node.addInput(input);
        node.addControl(rControl);
        node.addOutput(out);

        const color = 'rgb(97, 18, 140, 0.8)';
        node.data.style = `${color} !important`;
    }

    worker(node, inputs, outputs)
    {
        const parents = inputs.parent;
        if (!parents || parents.length < 1) return;
        const parent = parents[0];
        if (!parent.dataset) return;

        outputs.child = this;
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
    constructor(editor, pythonArchitecture)
    {
        super('Batch Norm.');
        this.data = {
            render: 'vue',
            component: Node
        };
        this.parent = null;
        this.tfjsConstructor = tf.layers.batchNormalization;
        this.editor = editor;
        this.pythonArchitecture = pythonArchitecture;
    }

    builder(node)
    {
        let input = new Rete.Input('parent', 'in', NUM_SOCKET);
        let out = new Rete.Output('child', 'out', NUM_SOCKET);

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
        const parents = inputs.parent;
        if (!parents || parents.length < 1) return;
        const parent = parents[0];
        if (!parent.dataset) return;

        outputs.child = this;
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
