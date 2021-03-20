
import Rete              from 'rete';
import { NUM_SOCKET }    from '../viewFlow';
import Node              from '../vue/Node';
import { NumberControl } from './NumberControl';

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
        let input = new Rete.Input('din', 'I', NUM_SOCKET);
        let out = new Rete.Output('dense', 'O', NUM_SOCKET);

        let control = new NumberControl(this.editor, 'size', 'Size', 'number', false);

        node.addInput(input);
        node.addControl(control);
        node.addOutput(out);
    }

    worker(node, inputs, outputs)
    {
        outputs.dense = node.data.dense;
        console.log(inputs);
        console.log(outputs);
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
        let input = new Rete.Input('cin', 'I', NUM_SOCKET);
        let out = new Rete.Output('conv', 'O', NUM_SOCKET);

        node.addInput(input);
        node.addOutput(out);
    }

    worker(node, inputs, outputs)
    {
        outputs.conv2d = node.data.conv2d;
        console.log(inputs);
        console.log(outputs);
    }
}

export { DenseLayerComponent, Conv2DLayerComponent };
