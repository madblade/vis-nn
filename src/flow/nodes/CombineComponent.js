import Rete                from 'rete';
import Node                from '../../vue/Node';
import { NUM_SOCKET }      from '../../viewFlow';
import { DropDownControl } from '../DropDownControl';

class ConcatenateComponent extends Rete.Component
{
    constructor()
    {
        super('Concatenate');
        this.data = {
            render: 'vue',
            component: Node
        };
    }

    builder(node)
    {
        let input1 = new Rete.Input('cin1', 'in', NUM_SOCKET);
        let input2 = new Rete.Input('cin2', 'in', NUM_SOCKET);
        let out = new Rete.Output('conv', 'out', NUM_SOCKET);

        // let tControl = new DropDownControl(this.editor, 't', 'Type',
        //     ['max', 'average']
        // );

        node.addInput(input1);
        node.addInput(input2);
        // node.addControl(tControl);
        node.addOutput(out);

        const color = 'rgb(148,132,55)';
        node.data.style = `${color} !important`;
    }

    worker(node, inputs, outputs)
    {
        // outputs.conv2d = node.data.conv2d;
        // console.log(`conv2d processing with activation ${this.aControl.getValue()}`);
    }
}

class AddComponent extends Rete.Component
{
    constructor()
    {
        super('Add');
        this.data = {
            render: 'vue',
            component: Node
        };
    }

    builder(node)
    {
        let input1 = new Rete.Input('cin1', 'in', NUM_SOCKET);
        let input2 = new Rete.Input('cin2', 'in', NUM_SOCKET);
        let out = new Rete.Output('conv', 'out', NUM_SOCKET);

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
        // outputs.conv2d = node.data.conv2d;
        console.log(`add processing with activation ${this.aControl.getValue()}`);
    }
}

export {
    ConcatenateComponent,
    AddComponent
};
