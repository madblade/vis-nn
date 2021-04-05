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

import hljs         from 'highlight.js/lib/core';
import python       from 'highlight.js/lib/languages/python';
hljs.registerLanguage('python', python);
window.hljs = hljs;

function init()
{
    const renderer = initRenderer();
    const camera = initScene();
    initComposer();
    initHTML(renderer, camera);
    initFlow();

    // TODO
    // 1. 2D car data
    // 2. mnist (dense, cnn, resnet)
    // 3. rl (simulator)
}

init();
animate();
