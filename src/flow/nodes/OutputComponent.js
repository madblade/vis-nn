
import Rete           from 'rete';
import { NUM_SOCKET } from '../../viewFlow';
import Node           from '../../vue/Node';

class OutputComponent extends Rete.Component
{
    constructor()
    {
        super('Output');
        this.data = {
            render: 'vue',
            component: Node
        };
    }

    builder(node)
    {
        let input = new Rete.Input('out', '', NUM_SOCKET);

        const color = 'rgb(97, 18, 140, 0.8)';
        node.data.style = `${color} !important`;

        node.addInput(input);
    }

    worker(node, inputs, outputs)
    {
        // inputs.num = node.data.num;
        console.log('sink');
        console.log(node);
    }
}

export { OutputComponent };
