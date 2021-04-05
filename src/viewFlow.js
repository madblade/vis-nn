import Rete                                                                   from 'rete';
import { InputComponent }                                                     from './flow/nodes/InputComponent';
import ContextMenuPlugin, { Menu }                                            from 'rete-context-menu-plugin';
import ConnectionPlugin                                                       from 'rete-connection-plugin';
import VueRenderPlugin                                                        from 'rete-vue-render-plugin';
import { isMobile }                                                           from './OrbitControlsZoomFixed';
import { Conv2DLayerComponent, DenseLayerComponent, Pooling2DLayerComponent } from './flow/nodes/LayerComponent';
import { OutputComponent }                                                    from './flow/nodes/OutputComponent';
import { AddComponent, ConcatenateComponent }                                 from './flow/nodes/CombineComponent';
import { BatchNormalizationComponent, DropoutComponent, FlattenComponent }    from './flow/nodes/TransformComponent';
import AutoArrangePlugin                                                      from 'rete-auto-arrange-plugin';

let NUM_SOCKET;
// let ACTION_SOCKET;
// let DATA_SOCKET;

const data = {
    id: 'demo@0.1.0',
    nodes: {
        1: {
            id: 1,
            data: {
                num: 2
            },
            inputs: {},
            outputs: {},
            position: [80, 200],
            name: 'Input'
        }
    },
    groups: {}
};

const basicExample = {
    id:'demo@0.1.0', nodes:{1:{id:1, data:{num:2, style:'rgb(85,126,19,0.8) !important'},
        inputs:{}, outputs:{child:{connections:[{node:4, input:'parent', data:{}}]}}, position:[0, -84], name:'Input'},
    2:{id:2, data:{style:'rgb(85,126,19,0.8) !important', size:10, lr:0.01, e:6, bs:64},
        inputs:{parent:{connections:[{node:6, output:'child', data:{}}]}}, outputs:{}, position:[1144, -224], name:'Output'},
    4:{id:4, data:{style:'rgba(140, 80, 18, 0.8) !important', filters:16, kx:'3,3', sx:'1,1'},
        inputs:{parent:{connections:[{node:1, output:'child', data:{}}]}}, outputs:{child:{connections:[{node:5, input:'parent', data:{}}]}},
        position:[276, -155], name:'Conv2D'}, 5:{id:5, data:{style:'rgb(97, 18, 140, 0.8) !important'},
        inputs:{parent:{connections:[{node:4, output:'child', data:{}}]}}, outputs:{child:{connections:[{node:6, input:'parent', data:{}}]}},
        position:[595, -62], name:'Flatten'}, 6:{id:6, data:{style:'rgba(140, 80, 18, 0.8) !important', size:32},
        inputs:{parent:{connections:[{node:5, output:'child', data:{}}]}},
        outputs:{child:{connections:[{node:2, input:'parent', data:{}}]}}, position:[825, -109], name:'Dense'}}};

const resNetExample = {id:'demo@0.1.0', nodes:{1:{id:1, data:{num:2, style:'rgb(85,126,19,0.8) !important'},
    inputs:{}, outputs:{child:{connections:[{node:4, input:'parent', data:{}}]}}, position:[296.09421062631225, -52.59606856993658],
    name:'Input'}, 2:{id:2, data:{style:'rgb(85,126,19,0.8) !important', size:10, lr:0.01, e:6, bs:64},
    inputs:{parent:{connections:[{node:9, output:'child', data:{}}]}}, outputs:{}, position:[2507.5077278842323, -173.35341887665305],
    name:'Output'}, 4:{id:4, data:{style:'rgba(140, 80, 18, 0.8) !important', filters:16, kx:'3,3', sx:'1,1'},
    inputs:{parent:{connections:[{node:1, output:'child', data:{}}]}}, outputs:{child:{connections:[{node:10, input:'parent', data:{}},
        {node:14, input:'parent2', data:{}}]}}, position:[572.0942106263122, -123.59606856993658],
    name:'Conv2D'}, 5:{id:5, data:{style:'rgb(97, 18, 140, 0.8) !important'},
    inputs:{parent:{connections:[{node:15, output:'child', data:{}}]}},
    outputs:{child:{connections:[{node:6, input:'parent', data:{}}]}},
    position:[1694.463489480539, -23.176465261880658], name:'Flatten'},
6:{id:6, data:{style:'rgba(140, 80, 18, 0.8) !important', size:32},
    inputs:{parent:{connections:[{node:5, output:'child', data:{}}]}},
    outputs:{child:{connections:[{node:9, input:'parent', data:{}}]}},
    position:[1921.5077278842323, -58.35341887665306], name:'Dense'},
9:{id:9, data:{style:'rgb(97, 18, 140, 0.8) !important', r:0.5},
    inputs:{parent:{connections:[{node:6, output:'child', data:{}}]}},
    outputs:{child:{connections:[{node:2, input:'parent', data:{}}]}},
    position:[2240.5077278842323, -34.35341887665306], name:'Dropout'},
10:{id:10, data:{style:'rgba(140, 80, 18, 0.8) !important', filters:16, kx:'3,3', sx:'1,1'},
    inputs:{parent:{connections:[{node:4, output:'child', data:{}}]}},
    outputs:{child:{connections:[{node:11, input:'parent', data:{}}]}},
    position:[585.71162275878, -478.4736551398337], name:'Conv2D'},
11:{id:11, data:{style:'rgba(140, 80, 18, 0.8) !important', filters:16, kx:'3,3', sx:'1,1'},
    inputs:{parent:{connections:[{node:10, output:'child', data:{}}]}},
    outputs:{child:{connections:[{node:14, input:'parent1', data:{}}]}},
    position:[895.8443413727845, -475.51783223581424], name:'Conv2D'},
12:{id:12, data:{style:'rgba(140, 80, 18, 0.8) !important', filters:16, kx:'3,3', sx:'1,1'},
    inputs:{parent:{connections:[{node:14, output:'child', data:{}}]}},
    outputs:{child:{connections:[{node:13, input:'parent', data:{}}]}},
    position:[1035.745756766094, -114.34508916717883], name:'Conv2D'},
13:{id:13, data:{style:'rgba(140, 80, 18, 0.8) !important', filters:16, kx:'3,3', sx:'1,1'},
    inputs:{parent:{connections:[{node:12, output:'child', data:{}}]}},
    outputs:{child:{connections:[{node:15, input:'parent2', data:{}}]}},
    position:[1337.3966845773396, -113.32776779456647], name:'Conv2D'},
14:{id:14, data:{style:'rgb(148,132,55) !important'}, inputs:{parent1:{connections:[{node:11, output:'child', data:{}}]},
    parent2:{connections:[{node:4, output:'child', data:{}}]}},
outputs:{child:{connections:[{node:12, input:'parent', data:{}},
    {node:15, input:'parent1', data:{}}]}}, position:[1206.1633357779972, -353.8574232279738], name:'Add'},
15:{id:15, data:{style:'rgb(148,132,55) !important'}, inputs:{parent1:{connections:[{node:14, output:'child', data:{}}]},
    parent2:{connections:[{node:13, output:'child', data:{}}]}},
outputs:{child:{connections:[{node:5, input:'parent', data:{}}]}},
position:[1681.654383030566, -229.21332484721245], name:'Add'}}};

const blankExample = {
    id:'demo@0.1.0', nodes:{1:{id:1, data:{num:2, style:'rgb(85,126,19,0.8) !important'},
        inputs:{}, outputs:{child:{connections:[]}}, position:[20, 50], name:'Input'},
    2:{id:2, data:{style:'rgb(85,126,19,0.8) !important', size:10, lr:0.01, e:6, bs:64},
        inputs:{parent:{connections:[]}}, outputs:{}, position:[891.784273691035, 48.390405204978094],
        name:'Output'}}};

const eventHandlers = {
    list: [],
    clear() {
        this.list.forEach(handler => {
            document.removeEventListener('keydown', handler);
        });
        this.list = [];
    },
    add(name, handler) {
        document.addEventListener(name, handler, false);
        this.list.push(handler);
    }
};

const mouseState = {
    clientX: 0,
    clientY: 0,
};

const pythonArchitecture = {
    dataset: {},
    model: {},
    modelMap: {}
};

function initEditor(editor)
{
    editor.use(VueRenderPlugin);
    editor.use(ConnectionPlugin, { curvature: 0.4 });
    editor.use(ContextMenuPlugin, {
        delay: 100,
        allocate(component) {
            switch (component.name)
            {
                case 'Input': return [];

                case 'Dense': return ['Layers'];
                case 'Conv2D': return ['Layers'];
                case 'Pooling2D': return ['Layers'];

                case 'Concatenate': return ['Combine'];
                case 'Add': return ['Combine'];

                case 'Flatten': return ['Transform'];
                case 'Dropout': return ['Transform'];
                case 'Batch Norm.': return ['Transform'];

                case 'Output': return [];
            }
            return null;
        },
        vueComponent: {
            // template: `
            //     <div class="context-menu"
            //         ref="menu"
            //         v-if="visible"
            //         v-bind:style="style"
            //         @mouseleave="timeoutHide()" @mouseover="cancelHide()" @contextmenu.prevent=""
            //     >
            //       <Item v-for="item in filtered" :key="item.title" :item="item" :args="args" :delay="delay / 2"></Item>
            //     </div>`,
            extends: { ...Menu },
            components: {
                Search: {
                    name: 'Search',
                    // template: '<div class="search"><input v-model="valuelocal"/></div>',
                    template: '<div class="search">Add</div>',
                    props: ['value', 'search'],
                    data() {
                        return { valuelocal: this.value };
                    },
                    watch: {
                        valuelocal() {
                            this.$emit('search', this.valuelocal);
                        }
                    }
                },
                // Item: {
                //     name: 'Item',
                //     template: `<div class="item"
                //         @click="onClick($event)"
                //         @mouseover="showSubitems()"
                //         @mouseleave="timeoutHide()"
                //         :class="{ hasSubitems }"
                //         > {{item.title}}
                //         <div class="subitems" v-show="hasSubitems && this.visibleSubitems">
                //             <Item v-for="subitem in item.subitems"
                //             :key="subitem.title"
                //             :item="subitem"
                //             :args="args"
                //             :delay="delay"
                //             ></Item>
                //         </div>
                //     </div>`,
                //     extends: { ...Item }
                // }
            }
        }
    });
}

function fixZoomOnChromeTouchpad(area)
{
    const _zoom = area._zoom;
    _zoom.destroy();
    _zoom.move = function(e) {
        _zoom.pointers = _zoom.pointers.map(p => (p.pointerId === e.pointerId ? e : p));
        if (!_zoom.translating) return;

        let rect = _zoom.el.getBoundingClientRect();

        let { cx, cy, distance } = _zoom.touches();

        if (_zoom.previous !== null)
        {
            const mobile = isMobile();
            if (mobile)
            {
                let delta = distance / _zoom.previous.distance - 1;
                const ox = (rect.left - cx) * delta;
                const oy = (rect.top - cy) * delta;
                _zoom.onzoom(delta, ox - (_zoom.previous.cx - cx), oy - (_zoom.previous.cy - cy), 'touch');
            }
            else
            {
                if (!_zoom.oldcy) {
                    _zoom.oldcy = cy;
                    return;
                }
                e.preventDefault();
                const deltaY = _zoom.oldcy - cy;
                const delta = -deltaY / 100 * _zoom.intensity;
                _zoom.onzoom(delta, 0, 0, 'wheel');
                _zoom.oldcy = cy;
            }
        }
        _zoom.previous = { cx, cy, distance };
    };
    _zoom.end = function(e)
    {
        _zoom.previous = null;
        _zoom.pointers = _zoom.pointers.filter(p => p.pointerId !== e.pointerId);
        _zoom.oldcy = 0;
    };
    function listenWindow(e, h) {
        window.addEventListener(e, h);
        return () => window.removeEventListener(e, h);
    }
    const destroyMove = listenWindow('pointermove', _zoom.move.bind(_zoom));
    const destroyUp = listenWindow('pointerup', _zoom.end.bind(_zoom));
    const destroyCancel = listenWindow('pointercancel', _zoom.end.bind(_zoom));
    _zoom.destroy = () => { destroyMove(); destroyUp(); destroyCancel(); };
}

function initFlow()
{
    NUM_SOCKET = new Rete.Socket('Flow');
    // ACTION_SOCKET = new Rete.Socket('Action');
    // DATA_SOCKET = new Rete.Socket('Data');

    // init
    const container = document.querySelector('#rete');
    const editor = new Rete.NodeEditor('demo@0.1.0', container);
    initEditor(editor);

    // eng
    const engine = new Rete.Engine('demo@0.1.0');
    // const modules = {};
    // editor.use(ModulePlugin.default, { engine, modules });

    // comp
    const inputComponent = new InputComponent(editor, pythonArchitecture);
    const denseComponent = new DenseLayerComponent(editor, pythonArchitecture);
    const conv2dComponent = new Conv2DLayerComponent(editor, pythonArchitecture);
    const pooling2dComponent = new Pooling2DLayerComponent(editor, pythonArchitecture);
    const concatenateComponent = new ConcatenateComponent(editor, pythonArchitecture);
    const flattenComponent = new FlattenComponent(editor, pythonArchitecture);
    const addComponent = new AddComponent(editor, pythonArchitecture);
    const batchNormComponent = new BatchNormalizationComponent(editor, pythonArchitecture);
    const dropoutComponent = new DropoutComponent(editor, pythonArchitecture);
    const outputComponent = new OutputComponent(editor, pythonArchitecture);
    const components = [
        inputComponent,

        conv2dComponent,
        denseComponent,
        pooling2dComponent,

        flattenComponent,
        batchNormComponent,
        dropoutComponent,

        addComponent,
        concatenateComponent,

        outputComponent
    ];

    // register
    components.forEach(c => {
        editor.register(c);
        engine.register(c);
    });

    // to zoom
    const { area } = editor.view;
    // area.zoom(0.9 * area.transform.k, 0, 0);
    fixZoomOnChromeTouchpad(area);

    // to disable dbclick
    editor.on('zoom', input => {
        const source = input.source;

        // prevent double click scroll
        if (source === 'dblclick') return false;
    });

    // wrapup
    async function compile() {
        const json = editor.toJSON();
        await engine.abort();
        await engine.process(json);
    }
    editor.on(
        'connectioncreate connectionremove nodecreate noderemove',
        () =>
        {
            if (editor.silent) return;
            eventHandlers.clear();
            setTimeout(() => compile(), 100);
        }
    );

    editor.fromJSON(data).then(() => {
        editor.view.resize();
        compile();
    });

    editor.on('keydown', e => {
        if (e.key === 'A' && e.shiftKey)
        {
            let rect = editor.view.container.getBoundingClientRect();
            const cx = mouseState.clientX || rect.left + rect.width / 2;
            const cy = mouseState.clientY || rect.top + rect.height / 2;
            let event = new MouseEvent('contextmenu', {
                clientX: cx,
                clientY: cy
            });
            editor.trigger('contextmenu', { e: event, view: editor.view });
            return;
        }

        if (e.code === 'Delete' || e.key === 'x') {
            editor.selected.each(n => editor.removeNode(n));
            return;
        }

        if (e.key === 'E' && e.shiftKey)
        {
            editor.trigger('arrange');
            return;
        }

        if (e.key === 'S' && e.shiftKey)
        {
            const json = editor.toJSON();
            console.log(JSON.stringify(json));
        }
    });

    document.addEventListener('mousemove', e => {
        mouseState.clientX = Math.floor(e.clientX);
        mouseState.clientY = Math.floor(e.clientY);
    });

    editor.use(AutoArrangePlugin, { margin: {x: 50, y: 50}, depth: 100 });

    // singleton input and output
    editor.on('nodecreate', node => {
        const names = ['Input', 'Output'];

        const name = node.name;
        if (names.includes(name) && editor.nodes.find(n => name === n.name && names.includes(name))) {
            console.log(`${name} already present`);
            return false;
        }
    });

    editor.on('process', () => {
        setTimeout(() => compile(), 100);
    });

    // listeners dropdown
    document.getElementById('basic').addEventListener('click', () => {
        editor.fromJSON(basicExample).then(() => {
            editor.view.resize();
            compile();
        });
    });
    document.getElementById('resnet').addEventListener('click', () => {
        editor.fromJSON(resNetExample).then(() => {
            editor.view.resize();
            compile();
        });
    });
    document.getElementById('blank').addEventListener('click', () => {
        editor.fromJSON(blankExample).then(() => {
            editor.view.resize();
            compile();
        });
    });
}

export { initFlow, NUM_SOCKET };
