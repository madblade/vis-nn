
import Rete           from 'rete';
import { NUM_SOCKET } from '../../viewFlow';
import Node           from '../../vue/Node';

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
        let out = new Rete.Output('in', '', NUM_SOCKET);

        const color = 'rgb(85,126,19,0.8)';
        node.data.style = `${color} !important`;

        node.addOutput(out);
    }

    worker(node, inputs, outputs)
    {
        outputs.num = node.data.num;
    }
}

export { InputComponent };
