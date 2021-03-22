/**
 * (c) madblade 2021
 */

import './style/flow.sass';
import './style/style.css';
import 'bootstrap';

import { initHTML } from './html.gui';
import {
    animate,
    initComposer,
    initRenderer,
    initScene
}                   from './view3d';
import { initFlow } from './viewFlow';

function init()
{
    const renderer = initRenderer();
    const camera = initScene();
    initComposer();
    initHTML(renderer, camera);
    initFlow();

    // TODO
    // 1. dense (prediction from 2D car data)
    // 2. cnn (mnist)
    // 3. resnet (mnist)
    // 3. rnn (music generation)
    // 4. gan (mnist)
    // 5. rl (pong or 2D fight)
}

init();
animate();
