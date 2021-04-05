
import * as tf             from '@tensorflow/tfjs';
import Rete                from 'rete';
import { NUM_SOCKET }      from '../../viewFlow';
import Node                from '../../vue/Node';
import { DropDownControl } from '../DropDownControl';

class InputComponent extends Rete.Component
{
    constructor(editor, pythonArchitecture)
    {
        super('Input');
        this.data = {
            render: 'vue',
            component: Node
        };
        this.tfjsConstructor = tf.input;
        this.dataset = { // TODO populate input
            IMAGE_HEIGHT: 0,
            IMAGE_WIDTH: 0,
            IMAGE_CHANNELS: 1,
        };
        this.editor = editor;
        this.pythonArchitecture = pythonArchitecture;
    }

    builder(node)
    {
        let out = new Rete.Output('child', '', NUM_SOCKET);
        let dControl = new DropDownControl(this.editor, 'a', 'Dataset',
            ['mnist', 'cifar10', 'cifar100', 'imdb', 'reuters', 'fashion_mnist', 'boston_housing']
        );

        node.addOutput(out);
        node.addControl(dControl);

        const color = 'rgb(85,126,19,0.8)';
        node.data.style = `${color} !important`;
    }

    worker(node, inputs, outputs)
    {
        outputs.child = this;
    }

    generateTFJSLayer()
    {
        const dataset = this.dataset;
        this.tfjsLayer = this.tfjsConstructor({shape: [
            dataset.IMAGE_HEIGHT,
            dataset.IMAGE_WIDTH,
            dataset.IMAGE_CHANNELS
        ]});
    }

    generatePythonLine()
    {
        return 'Input(shape=input_shape)';
    }
}

export { InputComponent };
