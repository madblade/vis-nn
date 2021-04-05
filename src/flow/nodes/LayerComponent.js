
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
        if (node.data.a) aControl.onChange(node.data.a);
    }

    worker(node, inputs, outputs)
    {
        const parents = inputs.parent;
        if (!parents || parents.length < 1) return;
        const parent = parents[0];
        if (!parent || !parent.dataset) return;

        node.data.dataset = parent.dataset;
        const pythonLines = parent.pythonLines;
        const parentId = pythonLines[pythonLines.length - 1][0];
        const pythonLine = `l${node.id} = ${this.generatePythonLine(node)}(l${parentId})`;
        node.data.pythonLines = [];
        for (let l = 0; l < pythonLines.length; ++l)
            node.data.pythonLines.push(pythonLines[l]);
        node.data.pythonLines.push([node.id, pythonLine]);

        outputs.child = node.data;
    }

    generateTFJSLayer()
    {
        // const parameters = this.parameters;
        // const parent = this.parent;
        // this.tfjsLayer = this.tfjsConstructor(parameters).apply(parent.tfjsLayer);
    }

    generatePythonLine(node)
    {
        const activation = node.data.a;
        let units = node.data.size;
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

        node.addInput(input);
        node.addControl(fControl);
        node.addControl(kControl);
        node.addControl(sControl);
        node.addControl(aControl);
        node.addOutput(out);

        const color = 'rgba(140, 80, 18, 0.8)';
        node.data.style = `${color} !important`;
        if (node.data.a) aControl.onChange(node.data.a);
    }

    worker(node, inputs, outputs)
    {
        const parents = inputs.parent;
        if (!parents || parents.length < 1) return;
        const parent = parents[0];
        if (!parent || !parent.dataset) return;

        // here the node is connected to the input
        node.data.dataset = parent.dataset;
        const pythonLines = parent.pythonLines;
        const parentId = pythonLines[pythonLines.length - 1][0];
        const pythonLine = `l${node.id} = ${this.generatePythonLine(node)}(l${parentId})`;
        node.data.pythonLines = [];
        for (let l = 0; l < pythonLines.length; ++l)
            node.data.pythonLines.push(pythonLines[l]);
        node.data.pythonLines.push([node.id, pythonLine]);
        console.log(node.id);

        outputs.child = node.data;
    }

    generateTFJSLayer()
    {
        // TODO set from params
        // TODO set from parent
        // const parameters = this.parameters;
        // const parent = this.parent;
        // this.tfjsLayer = this.tfjsConstructor(parameters).apply(parent.tfjsLayer);
    }

    generatePythonLine(node)
    {
        let filters = node.data.filters;
        if (filters < 1) {
            console.warn('Invalid filters number.');
            filters = 1;
        }
        let strides = node.data.sx;
        if (typeof strides !== 'string' || strides.split(',').length !== 2)
        {
            console.warn('Invalid strides.');
            strides = '1,1';
        }
        let kernelSize = node.data.kx;
        if (typeof kernelSize !== 'string' || kernelSize.split(',').length !== 2)
        {
            console.warn('Invalid kernel.');
            kernelSize = '3,3';
        }
        let activation = node.data.a;
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
        node.addControl(sControl);
        node.addControl(tControl);
        node.addOutput(out);

        const color = 'rgba(140, 80, 18, 0.8)';
        node.data.style = `${color} !important`;
        if (node.data.t) tControl.onChange(node.data.t);
    }

    worker(node, inputs, outputs)
    {
        const parents = inputs.parent;
        if (!parents || parents.length < 1) return;
        const parent = parents[0];
        if (!parent || !parent.dataset) return;

        node.data.dataset = parent.dataset;
        const pythonLines = parent.pythonLines;
        const parentId = pythonLines[pythonLines.length - 1][0];
        const pythonLine = `l${node.id} = ${this.generatePythonLine(node)}(l${parentId})`;
        node.data.pythonLines = [];
        for (let l = 0; l < pythonLines.length; ++l)
            node.data.pythonLines.push(pythonLines[l]);
        node.data.pythonLines.push([node.id, pythonLine]);

        outputs.child = node.data;
    }

    generateTFJSLayer()
    {
        // const parameters = this.parameters;
        // const parent = this.parent;
        // this.tfjsLayer = this.tfjsConstructor(parameters).apply(parent.tfjsLayer);
    }

    generatePythonLine(node)
    {
        let poolSize = node.data.px;
        if (typeof poolSize !== 'string' || poolSize.split(',').length !== 2)
        {
            console.warn('Invalid pool size.');
            poolSize = '3,3';
        }
        let stride = node.data.sx;
        if (typeof stride !== 'string' || stride.split(',').length !== 2)
        {
            console.warn('Invalid pool size.');
            stride = '1,1';
        }
        let prefix = node.data.t;
        prefix = prefix === 'max' ? 'Max' : prefix === 'average' ? 'Average' : 'Max';

        return `${prefix}Pooling2D(pool_size=(${poolSize}), strides=(${stride}))`;
    }
}

export {
    DenseLayerComponent,
    Conv2DLayerComponent,
    Pooling2DLayerComponent,
};
