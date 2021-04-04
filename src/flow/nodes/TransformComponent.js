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
    }

    builder(node)
    {
        let input = new Rete.Input('cin', 'in', NUM_SOCKET);
        let out = new Rete.Output('conv', 'out', NUM_SOCKET);

        let mControl = new NumberControl(this.editor, 'r', 'Momentum', 'number', false, 0.99);
        let aControl = new DropDownControl(this.editor, 'a', 'Activation',
            ['linear', 'relu', 'tanh', 'sigmoid']
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
}

export {
    BatchNormalizationComponent,
    DropoutComponent,
    FlattenComponent
};
