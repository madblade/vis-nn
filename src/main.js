/**
 * (c) madblade 2021
 */

import './style/style.css';
import 'bootstrap';

import { initHTML }     from './html.gui';
import {
    animate,
    initComposer,
    initRenderer,
    initScene
}                       from './view3d';

function init()
{
    const renderer = initRenderer();
    const camera = initScene();
    initComposer();
    initHTML(renderer, camera);
}

init();
animate();
