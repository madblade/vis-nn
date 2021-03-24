
import Rete                from 'rete';
import { NUM_SOCKET }      from '../viewFlow';
import Node                from '../vue/Node';
import { NumberControl }   from './NumberControl';
import { DropDownControl } from './DropDownControl';

class DenseLayerComponent extends Rete.Component
{
    constructor(editor)
    {
        super('Dense');
        // this.component = Node;
        this.data = {
            render: 'vue',
            component: Node
        };
        this.editor = editor;
    }

    builder(node)
    {
        let input = new Rete.Input('din', 'in', NUM_SOCKET);
        let out = new Rete.Output('dense', 'out', NUM_SOCKET);

        let control = new NumberControl(this.editor, 'size', 'Units', 'number', false, 10);
        let aControl = new DropDownControl(this.editor, 'a', 'Activation',
            ['linear', 'relu', 'tanh', 'sigmoid']
        );

        this.unitsControl = control;

        node.addInput(input);
        node.addControl(control);
        node.addControl(aControl);
        node.addOutput(out);

        const color = 'rgb(85,126,19,0.8)';
        node.data.style = `${color} !important`;
    }

    worker(node, inputs, outputs)
    {
        outputs.size = node.data.size;
        // console.log(inputs);
        // console.log(outputs);

        console.log(`dense processing with units ${this.unitsControl.getValue()}`);
    }
}

class Conv2DLayerComponent extends Rete.Component
{
    constructor()
    {
        super('Conv2D');
        this.data = {
            render: 'vue',
            component: Node
        };
    }

    builder(node)
    {
        let input = new Rete.Input('cin', 'in', NUM_SOCKET);
        let out = new Rete.Output('conv', 'out', NUM_SOCKET);

        let fControl = new NumberControl(this.editor, 'filters', 'Filters', 'number', false, 1);
        let kControl = new NumberControl(this.editor, 'kx', 'Kernel', 'text', false, '3,3');
        let sControl = new NumberControl(this.editor, 'sx', 'Stride', 'text', false, '1,1');
        let aControl = new DropDownControl(this.editor, 'a', 'Activation',
            ['linear', 'relu', 'tanh', 'sigmoid']
        );

        this.aControl = aControl;

        node.addInput(input);
        node.addControl(fControl);
        node.addControl(kControl);
        node.addControl(sControl);
        node.addControl(aControl);
        node.addOutput(out);

        const color = 'rgb(85,126,19,0.8)';
        node.data.style = `${color} !important`;
    }

    worker(node, inputs, outputs)
    {
        outputs.conv2d = node.data.conv2d;
        console.log(`conv2d processing with activation ${this.aControl.getValue()}`);
    }
}

export { DenseLayerComponent, Conv2DLayerComponent };
