
import * as tf             from '@tensorflow/tfjs';
import Rete                from 'rete';
import { NUM_SOCKET }      from '../../viewFlow';
import Node                from '../../vue/Node';
import { NumberControl }   from '../NumberControl';
import { DropDownControl } from '../DropDownControl';

function generatePythonCode(dataset, model, modelCode)
{


    const code = `
import tensorflow as tf
from tf.keras.datasets import ${dataset.pythonName}
from tf.keras.models import Model
from tf.keras.layers import Dense, Dropout, Flatten, Input, Concatenate, BatchNormalization, Add
from tf.keras.layers import Conv2D, MaxPooling2D, ReLU
from tf.keras import backend as K
batch_size = ${model.params.batchSize}
num_classes = ${dataset.NUM_CLASSES}
epochs = ${model.params.epochs}
# input image dimensions
img_rows, img_cols, channels = ${dataset.IMAGE_HEIGHT}, ${dataset.IMAGE_WIDTH}, ${dataset.IMAGE_CHANNELS}
# the data, split between train and test sets
(x_train, y_train), (x_test, y_test) = ${dataset.pythonName}.load_data()
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
############################# Architecture made by Ennui
${modelCode}
#############################
model.compile(loss=tf.keras.losses.${model.params.getPythonLoss()},
              optimizer=tf.keras.optimizers.${model.params.getPythonOptimizer()}(lr=${model.params.learningRate}),
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
    return code;
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
        this.parent = null;
        this.tfjsConstructor = tf.layers.dense;
        this.editor = editor;
        this.pythonArchitecture = pythonArchitecture;
    }

    builder(node)
    {
        let input = new Rete.Input('parent', '', NUM_SOCKET);
        let control = new NumberControl(this.editor, 'size', 'Dimension', 'number', false, 10);
        let aControl = new DropDownControl(this.editor, 'a', 'Activation',
            ['softmax', 'sigmoid', 'linear', 'relu', 'tanh']
        );
        let oControl = new DropDownControl(this.editor, 'o', 'Optimizer',
            ['sgd', 'rmsprop', 'adagrad', 'adam']
        );
        let lControl = new DropDownControl(this.editor, 'l', 'Loss',
            ['X-Entropy', 'Hinge', 'MSE', 'MAE']
        );

        node.addInput(input);
        node.addControl(control);
        node.addControl(aControl);
        node.addControl(oControl);
        node.addControl(lControl);

        const color = 'rgb(85,126,19,0.8)';
        node.data.style = `${color} !important`;
    }

    worker(node, inputs, outputs)
    {
        // inputs.num = node.data.num;
        console.log('last call');
    }

    generateTFJSLayer()
    {
        const parameters = this.parameters;
        const parent = this.parent;
        this.tfjsLayer = this.tfjsConstructor(parameters).apply(parent.tfjsLayer);
    }

    generatePythonLine()
    {
        const parameters = this.parameters;
        const activation = this.activation;
        const activationText = `, activation='${activation}'`;
        return `Dense(${parameters.size}${activationText})`;
    }
}

export { OutputComponent };
