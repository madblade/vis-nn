
import * as tf             from '@tensorflow/tfjs';
import Rete                from 'rete';
import { NUM_SOCKET }      from '../../viewFlow';
import Node                from '../../vue/Node';
import { NumberControl }   from '../NumberControl';
import { DropDownControl } from '../DropDownControl';

function generatePythonCode(parameters, dataset, pythonLines)
{
    let modelCode = '\n';
    for (let i = 0; i < pythonLines.length; i++)
    {
        modelCode += `${pythonLines[i][1]}\n`;
    }
    modelCode += `model = Model(l${pythonLines[0][0]}, l${pythonLines[pythonLines.length - 1][0]})\n`;

    return `import tensorflow as tf
from tf.keras.datasets import ${dataset.NAME}
from tf.keras.models import Model
from tf.keras.layers import Dense, Dropout, Flatten, Input, Concatenate, BatchNormalization, Add
from tf.keras.layers import Conv2D, MaxPooling2D, ReLU
from tf.keras import backend as K
batch_size = ${parameters.batchSize}
num_classes = ${dataset.NUM_CLASSES}
epochs = ${parameters.epochs}
# input image dimensions
img_rows, img_cols, channels = ${dataset.IMAGE_HEIGHT}, ${dataset.IMAGE_WIDTH}, ${dataset.IMAGE_CHANNELS}
# the data, split between train and test sets
(x_train, y_train), (x_test, y_test) = ${dataset.NAME}.load_data()
if K.image_data_format() == 'channels_first':
    x_train = x_train.reshape(x_train.shape[0], channels, img_rows, img_cols)
    x_test = x_test.reshape(x_test.shape[0], channels, img_rows, img_cols)
    input_shape = (channels, img_rows, img_cols)
else:
    x_train = x_train.reshape(x_train.shape[0], img_rows, img_cols, channels)
    x_test = x_test.reshape(x_test.shape[0], img_rows, img_cols, channels)
    input_shape = (img_rows, img_cols, channels)
x_train = x_train.astype('float32')
x_test = x_test.astype('float32')
x_train /= 255
x_test /= 255
print('x_train shape:', x_train.shape)
print(x_train.shape[0], 'train samples')
print(x_test.shape[0], 'test samples')
# convert class vectors to binary class matrices
y_train = tf.keras.utils.to_categorical(y_train, num_classes)
y_test = tf.keras.utils.to_categorical(y_test, num_classes)
############################# Architecture (credit: Ennui)
${modelCode}
#############################
model.compile(loss=tf.keras.losses.${parameters.loss},
              optimizer=tf.keras.optimizers.${parameters.optimizer}(lr=${parameters.learningRate}),
              metrics=['accuracy'])
model.fit(x_train, y_train,
          batch_size=batch_size,
          epochs=epochs,
          verbose=1,
          validation_data=(x_test, y_test))
score = model.evaluate(x_test, y_test, verbose=0)
print('Test loss:', score[0])
print('Test accuracy:', score[1])

`;
}

class OutputComponent extends Rete.Component
{
    constructor(editor, pythonArchitecture)
    {
        super('Output');
        this.data = {
            render: 'vue',
            component: Node
        };
        this.tfjsConstructor = tf.layers.dense;
        this.editor = editor;
        this.pythonArchitecture = pythonArchitecture;
    }

    builder(node)
    {
        let input = new Rete.Input('parent', '', NUM_SOCKET);
        let dControl = new NumberControl(this.editor, 'size', 'Dense Units', 'number', false, 10);
        let aControl = new DropDownControl(this.editor, 'a', 'Activation',
            ['softmax', 'sigmoid', 'linear', 'relu', 'tanh']
        );
        let oControl = new DropDownControl(this.editor, 'o', 'Optimizer',
            ['SGD', 'RMSprop', 'Adagrad', 'Adam']
        );
        let lControl = new DropDownControl(this.editor, 'l', 'Loss',
            ['X-Entropy', 'Hinge', 'MSE', 'MAE']
        );
        let lrControl = new NumberControl(this.editor, 'lr', 'Learning Rate', 'number', false, 0.01);
        let eControl = new NumberControl(this.editor, 'e', 'Epochs', 'number', false, 6);
        let bsControl = new NumberControl(this.editor, 'bs', 'Batch Size', 'number', false, 64);

        node.addInput(input);
        node.addControl(dControl);
        node.addControl(aControl);
        node.addControl(oControl);
        node.addControl(lControl);

        node.addControl(lrControl);
        node.addControl(eControl);
        node.addControl(bsControl);

        const color = 'rgb(85,126,19,0.8)';
        node.data.style = `${color} !important`;
        if (node.data.a) aControl.onChange(node.data.a);
        if (node.data.o) oControl.onChange(node.data.o);
        if (node.data.l) lControl.onChange(node.data.l);
    }

    eraseEditorCode()
    {
        const codeElement = document.getElementById('code-container');
        codeElement.innerHTML = '';
    }

    // eslint-disable-next-line no-unused-vars
    worker(node, inputs, outputs)
    {
        console.log('Processing…');
        const parents = inputs.parent;
        if (!parents || parents.length < 1) {
            this.eraseEditorCode();
            return;
        }
        const parent = parents[0];
        if (!parent || !parent.dataset) {
            this.eraseEditorCode();
            return;
        }
        const dataset = parent.dataset;

        let learningRate = node.data.lr;
        if (learningRate > 1 || learningRate <= 0) {
            console.warn('Invalid learning rate.');
            learningRate = 0.01;
        }
        let epochs = node.data.e;
        if (epochs < 1) {
            console.warn('Invalid epoch number.');
            epochs = 1;
        }
        let batchSize = node.data.bs;
        if (batchSize < 1) {
            console.warn('Invalid batch size.');
            batchSize = 1;
        }
        let loss = node.data.l;
        switch (loss)
        {
            case 'X-Entropy': loss = 'categorical_crossentropy'; break;
            case 'Hinge': loss = 'hinge'; break;
            case 'MSE': loss = 'mse'; break;
            case 'MAE': loss = 'mae'; break;
            default: loss = 'categorical_crossentropy'; break;
        }
        let optimizer = node.data.o;
        switch (optimizer)
        {
            case 'SGD':
            case 'RMSProp':
            case 'Adam':
            case 'Adagrad':
                break;
            default: optimizer = 'RMSprop'; break;
        }

        let lastLayerUnits = node.data.size;
        if (lastLayerUnits < 1)
        {
            console.warn('Invalid output dimension.');
            lastLayerUnits = 1;
        }
        let lastLayerActivation = node.data.a;

        const pythonLines = parent.pythonLines;
        const parentId = pythonLines[pythonLines.length - 1][0];
        const pythonLine = `l${node.id} = ${this.generatePythonLine(lastLayerUnits, lastLayerActivation)}(l${parentId})`;
        pythonLines.push([node.id, pythonLine]);

        const modelParams = {
            learningRate,
            epochs,
            batchSize,
            optimizer,
            loss
        };

        const code = generatePythonCode(modelParams, dataset, pythonLines);

        const codeElement = document.getElementById('code-container');
        codeElement.innerHTML = `<pre><code id="tfcode">${code}</code></pre>`;
        window.hljs.highlightAll();
    }

    generateTFJSLayer()
    {
        // const parameters = this.parameters;
        // const parent = this.parent;
        // this.tfjsLayer = this.tfjsConstructor(parameters).apply(parent.tfjsLayer);
    }

    generatePythonLine(units, activation)
    {
        const activationText = activation === 'linear' ? '' : `, activation='${activation}'`;
        return `Dense(${units}${activationText})`;
    }
}

export { OutputComponent };
