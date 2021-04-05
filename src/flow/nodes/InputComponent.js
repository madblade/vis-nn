
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
        this.dataset = {
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
            ['mnist', 'fashion_mnist', 'cifar10', 'cifar100'] //, 'imdb', 'reuters', 'boston_housing']
        );

        this.dControl = dControl;
        node.addOutput(out);
        node.addControl(dControl);

        const color = 'rgb(85,126,19,0.8)';
        node.data.style = `${color} !important`;
    }

    worker(node, inputs, outputs)
    {
        let datasetName = this.dControl.getValue();
        switch (datasetName)
        {
            case 'mnist':
            case 'fashion_mnist':
            case 'cifar10':
            case 'cifar100':
            // case 'imdb':
            // case 'reuters':
            // case 'boston_housing':
                break;
            default:
                console.warn('Invalid dataset.');
                datasetName = 'mnist';
                break;
        }
        const isMNIST = datasetName === 'mnist' || datasetName === 'fashion_mnist';
        this.dataset = {
            IMAGE_HEIGHT: isMNIST ? 28 : 32,
            IMAGE_WIDTH: isMNIST ? 28 : 32,
            IMAGE_CHANNELS: isMNIST ? 1 : 3,
            NUM_CLASSES: 10,
            NAME: datasetName
        };

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
