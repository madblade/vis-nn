
import Rete                        from 'rete';
import { InputComponent }          from './flow/InputComponent';
import ContextMenuPlugin, { Menu } from 'rete-context-menu-plugin';
import ConnectionPlugin            from 'rete-connection-plugin';
import VueRenderPlugin             from 'rete-vue-render-plugin';
import { isMobile }                                  from './OrbitControlsZoomFixed';
import { Conv2DLayerComponent, DenseLayerComponent } from './flow/LayerComponent';

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

function initEditor(editor)
{
    editor.use(VueRenderPlugin);
    editor.use(ConnectionPlugin, { curvature: 0.4 });
    editor.use(ContextMenuPlugin, {
        delay: 10000000,
        allocate(component) {
            switch (component.name)
            {
                case 'Input': return [];
                case 'Dense': return ['Layers'];
                case 'Conv2D': return ['Layers'];
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
    NUM_SOCKET = new Rete.Socket('Architecture');
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
    const inputComponent = new InputComponent();
    const denseComponent = new DenseLayerComponent(editor);
    const conv2dComponent = new Conv2DLayerComponent(editor);

    // register
    editor.register(inputComponent);
    editor.register(denseComponent);
    editor.register(conv2dComponent);
    engine.register(inputComponent);
    engine.register(denseComponent);
    engine.register(conv2dComponent);

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
            compile();
        }
    );

    editor.fromJSON(data).then(() => {
        editor.view.resize();
        compile();
    });
}

export { initFlow, NUM_SOCKET };
