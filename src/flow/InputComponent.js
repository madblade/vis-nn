
import Rete           from 'rete';
import { NUM_SOCKET } from '../viewFlow';
import Node           from '../vue/Node';

class InputComponent extends Rete.Component
{
    constructor()
    {
        super('Input');
        this.data = {
            render: 'vue',
            component: Node
        };
    }

    builder(node)
    {
        let out = new Rete.Output('in', 'Input', NUM_SOCKET);

        node.addOutput(out);
    }

    worker(node, inputs, outputs)
    {
        outputs.num = node.data.num;
    }
}

export { InputComponent };
