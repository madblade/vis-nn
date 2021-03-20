
import Rete           from 'rete';
import { NUM_SOCKET } from '../viewFlow';
import Node           from '../vue/Node';

class DenseLayerComponent extends Rete.Component
{
    constructor()
    {
        super('Dense');
        // this.component = Node;
        this.data = {
            render: 'vue',
            component: Node
        };
    }

    builder(node)
    {
        let input = new Rete.Input('din', 'DenseIn', NUM_SOCKET);
        let out = new Rete.Output('dense', 'Dense', NUM_SOCKET);

        node.addInput(input);
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
    }

    builder(node)
    {
        let input = new Rete.Input('cin', 'Conv2DIn', NUM_SOCKET);
        let out = new Rete.Output('conv', 'Conv2D', NUM_SOCKET);

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
