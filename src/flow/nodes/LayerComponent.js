
import * as tf             from '@tensorflow/tfjs';
import Rete                from 'rete';
import { NUM_SOCKET }      from '../../viewFlow';
import Node                from '../../vue/Node';
import { NumberControl }   from '../NumberControl';
import { DropDownControl } from '../DropDownControl';

class DenseLayerComponent extends Rete.Component
{
    constructor(editor, pythonArchitecture)
    {
        super('Dense');
        this.data = {
            render: 'vue',
            component: Node
        };
        this.parent = null;
        this.tfjsConstructor = tf.layers.dense;
        this.editor = editor;
        this.pythonArchitecture = pythonArchitecture;
    }

    builder(node)
    {
        let input = new Rete.Input('parent', 'in', NUM_SOCKET);
        let out = new Rete.Output('child', 'out', NUM_SOCKET);

        let uControl = new NumberControl(this.editor, 'size', 'Units', 'number', false, 10);
        let aControl = new DropDownControl(this.editor, 'a', 'Activation',
            ['relu', 'tanh', 'sigmoid', 'linear']
        );

        node.addInput(input);
        node.addControl(uControl);
        this.uControl = uControl;
        node.addControl(aControl);
        this.aControl = aControl;
        node.addOutput(out);

        const color = 'rgba(140, 80, 18, 0.8)';
        node.data.style = `${color} !important`;
    }

    worker(node, inputs, outputs)
    {
        const parents = inputs.parent;
        if (!parents || parents.length < 1) return;
        const parent = parents[0];
        if (!parent || !parent.dataset) return;

        this.dataset = parent.dataset;
        const pythonLines = parent.pythonLines;
        const parentId = pythonLines[pythonLines.length - 1][0];
        const pythonLine = `l${node.id} = ${this.generatePythonLine()}(l${parentId})`;
        this.pythonLines = [];
        for (let l = 0; l < pythonLines.length; ++l)
            this.pythonLines.push(pythonLines[l]);
        this.pythonLines.push([node.id, pythonLine]);

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
        const activation = this.aControl.getValue();
        let units = this.uControl.getValue();
        if (units < 1)
        {
            console.warn('Invalid unit number.');
            units = 1;
        }
        const activationText = activation === 'linear' ? '' : `, activation='${activation}'`;
        return `Dense(${units}${activationText})`;
    }
}

class Conv2DLayerComponent extends Rete.Component
{
    constructor(editor, pythonArchitecture)
    {
        super('Conv2D');
        this.data = {
            render: 'vue',
            component: Node
        };
        this.parent = null;
        this.tfjsConstructor = tf.layers.conv2d;
        this.editor = editor;
        this.pythonArchitecture = pythonArchitecture;
    }

    builder(node)
    {
        let input = new Rete.Input('parent', 'in', NUM_SOCKET);
        let out = new Rete.Output('child', 'out', NUM_SOCKET);

        let fControl = new NumberControl(this.editor, 'filters', 'Filters', 'number', false, 1);
        let kControl = new NumberControl(this.editor, 'kx', 'Kernel', 'text', false, '3,3');
        let sControl = new NumberControl(this.editor, 'sx', 'Stride', 'text', false, '1,1');
        let aControl = new DropDownControl(this.editor, 'a', 'Activation',
            ['relu', 'tanh', 'sigmoid', 'linear']
        );

        this.aControl = aControl;

        node.addInput(input);
        node.addControl(fControl);
        this.fControl = fControl;
        node.addControl(kControl);
        this.kControl = kControl;
        node.addControl(sControl);
        this.sControl = sControl;
        node.addControl(aControl);
        this.aControl = aControl;
        node.addOutput(out);

        const color = 'rgba(140, 80, 18, 0.8)';
        node.data.style = `${color} !important`;
    }

    worker(node, inputs, outputs)
    {
        const parents = inputs.parent;
        if (!parents || parents.length < 1) return;
        const parent = parents[0];
        if (!parent || !parent.dataset) return;

        // here the node is connected to the input
        this.dataset = parent.dataset;
        const pythonLines = parent.pythonLines;
        const parentId = pythonLines[pythonLines.length - 1][0];
        const pythonLine = `l${node.id} = ${this.generatePythonLine()}(l${parentId})`;
        this.pythonLines = [];
        for (let l = 0; l < pythonLines.length; ++l)
            this.pythonLines.push(pythonLines[l]);
        this.pythonLines.push([node.id, pythonLine]);
        console.log(node.id);
        console.log(this);

        outputs.child = this;
    }

    generateTFJSLayer()
    {
        // TODO set from params
        // TODO set from parent
        const parameters = this.parameters;
        const parent = this.parent;
        this.tfjsLayer = this.tfjsConstructor(parameters).apply(parent.tfjsLayer);
    }

    generatePythonLine()
    {
        let filters = this.fControl.getValue();
        if (filters < 1) {
            console.warn('Invalid filters number.');
            filters = 1;
        }
        let strides = this.sControl.getValue();
        if (typeof strides !== 'string' || strides.split(',').length !== 2)
        {
            console.warn('Invalid strides.');
            strides = '1,1';
        }
        let kernelSize = this.kControl.getValue();
        if (typeof kernelSize !== 'string' || kernelSize.split(',').length !== 2)
        {
            console.warn('Invalid kernel.');
            kernelSize = '3,3';
        }
        let activation = this.aControl.getValue();
        // don’t need to filter that

        const activationText = activation === 'linear' ? '' : `, activation='${activation}'`;
        return `Conv2D(${filters}, (${kernelSize}), strides=(${strides})${activationText}, padding='same')`;
    }
}

class Pooling2DLayerComponent extends Rete.Component
{
    constructor(editor, pythonArchitecture)
    {
        super('Pooling2D');
        this.data = {
            render: 'vue',
            component: Node
        };
        this.parent = null;
        // TODO distinction in tfjs
        this.tfjsConstructor = tf.layers.maxPooling2d;
        this.tfjsConstructor = tf.layers.averagePooling2d;
        this.editor = editor;
        this.pythonArchitecture = pythonArchitecture;
    }

    builder(node)
    {
        let input = new Rete.Input('parent', 'in', NUM_SOCKET);
        let out = new Rete.Output('child', 'out', NUM_SOCKET);

        let pControl = new NumberControl(this.editor, 'px', 'Pool size', 'text', false, '3,3');
        let sControl = new NumberControl(this.editor, 'sx', 'Stride', 'text', false, '1,1');
        let tControl = new DropDownControl(this.editor, 't', 'Type',
            ['max', 'average']
        );

        node.addInput(input);
        node.addControl(pControl);
        this.pControl = pControl;
        node.addControl(sControl);
        this.sControl = sControl;
        node.addControl(tControl);
        this.tControl = tControl;
        node.addOutput(out);

        const color = 'rgba(140, 80, 18, 0.8)';
        node.data.style = `${color} !important`;
    }

    worker(node, inputs, outputs)
    {
        const parents = inputs.parent;
        if (!parents || parents.length < 1) return;
        const parent = parents[0];
        if (!parent || !parent.dataset) return;

        this.dataset = parent.dataset;
        const pythonLines = parent.pythonLines;
        const parentId = pythonLines[pythonLines.length - 1][0];
        const pythonLine = `l${node.id} = ${this.generatePythonLine()}(l${parentId})`;
        this.pythonLines = [];
        for (let l = 0; l < pythonLines.length; ++l)
            this.pythonLines.push(pythonLines[l]);
        this.pythonLines.push([node.id, pythonLine]);

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
        let poolSize = this.pControl.getValue();
        if (typeof poolSize !== 'string' || poolSize.split(',').length !== 2)
        {
            console.warn('Invalid pool size.');
            poolSize = '3,3';
        }
        let stride = this.sControl.getValue();
        if (typeof stride !== 'string' || stride.split(',').length !== 2)
        {
            console.warn('Invalid pool size.');
            stride = '1,1';
        }
        let prefix = this.tControl.getValue();
        prefix = prefix === 'max' ? 'Max' : prefix === 'average' ? 'Average' : 'Max';

        return `${prefix}Pooling2D(pool_size=(${poolSize}), strides=(${stride}))`;
    }
}

export {
    DenseLayerComponent,
    Conv2DLayerComponent,
    Pooling2DLayerComponent,
};
