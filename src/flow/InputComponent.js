
import Rete           from 'rete';
import { NUM_SOCKET } from '../viewFlow';

class InputComponent extends Rete.Component
{
    constructor()
    {
        super('Input');
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
