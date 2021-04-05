
import * as tf             from '@tensorflow/tfjs';
import Rete                from 'rete';
import Node                from '../../vue/Node';
import { NUM_SOCKET }      from '../../viewFlow';
import { DropDownControl } from '../DropDownControl';

class ConcatenateComponent extends Rete.Component
{
    constructor(editor, pythonArchitecture)
    {
        super('Concatenate');
        this.data = {
            render: 'vue',
            component: Node
        };
        this.parents = [];
        this.tfjsContstructor = tf.layers.concatenate;
        this.editor = editor;
        this.pythonArchitecture = pythonArchitecture;
    }

    builder(node)
    {
        let input1 = new Rete.Input('parent1', 'in', NUM_SOCKET);
        let input2 = new Rete.Input('parent2', 'in', NUM_SOCKET);
        let out = new Rete.Output('child', 'out', NUM_SOCKET);

        node.addInput(input1);
        node.addInput(input2);
        node.addOutput(out);

        const color = 'rgb(148,132,55)';
        node.data.style = `${color} !important`;
    }

    worker(node, inputs, outputs)
    {
        const parents1 = inputs.parent1;
        const parents2 = inputs.parent2;
        if (!parents1 || parents1.length < 1) return;
        if (!parents2 || parents2.length < 1) return;
        const parent1 = parents1[0];
        const parent2 = parents1[0];
        if (!parent1.dataset) return;
        if (!parent2.dataset) return;

        outputs.child = this;
    }

    generateTFJSLayer()
    {
        const parameters = this.parameters;
        const parents = [];
        for (const parent of this.parents)
        {
            parents.push(parent.tfjsLayer);
        }
        this.tfjsLayer = this.tfjsConstructor(parameters).apply(parents);
    }

    generatePythonLine()
    {
        return 'Concatenate()';
    }
}

class AddComponent extends Rete.Component
{
    constructor(editor, pythonArchitecture)
    {
        super('Add');
        this.data = {
            render: 'vue',
            component: Node
        };
        this.parents = [];
        this.tfjsConstructor = tf.layers.add;
        this.editor = editor;
        this.pythonArchitecture = pythonArchitecture;
    }

    builder(node)
    {
        let input1 = new Rete.Input('parent1', 'in', NUM_SOCKET);
        let input2 = new Rete.Input('parent2', 'in', NUM_SOCKET);
        let out = new Rete.Output('child', 'out', NUM_SOCKET);

        let aControl = new DropDownControl(this.editor, 'a', 'Activation',
            ['linear', 'relu', 'tanh', 'sigmoid']
        );

        this.aControl = aControl;

        node.addInput(input1);
        node.addInput(input2);
        node.addControl(aControl);
        node.addOutput(out);

        const color = 'rgb(148,132,55)';
        node.data.style = `${color} !important`;
    }

    worker(node, inputs, outputs)
    {
        const parents1 = inputs.parent1;
        const parents2 = inputs.parent2;
        if (!parents1 || parents1.length < 1) return;
        if (!parents2 || parents2.length < 1) return;
        const parent1 = parents1[0];
        const parent2 = parents1[0];
        if (!parent1.dataset) return;
        if (!parent2.dataset) return;

        outputs.child = this;
    }

    generateTFJSLayer()
    {
        const parameters = this.parameters;
        const parents = [];
        for (const parent of this.parents)
        {
            parents.push(parent.tfjsLayer);
        }
        this.tfjsLayer = this.tfjsConstructor(parameters).apply(parents);
    }

    generatePythonLine()
    {
        return 'Add()';
    }
}

export {
    ConcatenateComponent,
    AddComponent
};
