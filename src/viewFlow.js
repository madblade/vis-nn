
import Rete                 from 'rete';
import { InputComponent }   from './flow/InputComponent';
import ContextMenuPlugin    from 'rete-context-menu-plugin';
import ConnectionPlugin     from 'rete-connection-plugin';
import VueRenderPlugin      from 'rete-vue-render-plugin';
import {Menu} from 'rete-context-menu-plugin';

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

function initFlow()
{
    NUM_SOCKET = new Rete.Socket('Architecture');
    // ACTION_SOCKET = new Rete.Socket('Action');
    // DATA_SOCKET = new Rete.Socket('Data');

    // init
    const container = document.querySelector('#rete');
    const editor = new Rete.NodeEditor('demo@0.1.0', container);
    editor.use(VueRenderPlugin);
    editor.use(ConnectionPlugin, { curvature: 0.4 });
    editor.use(ContextMenuPlugin, {
        vueComponent: {
            extends: { ...Menu },
            components: {
                Search: {
                    name: 'Search',
                    template: '<div class="search"><input v-model="valuelocal"/></div>',
                    props: ['value', 'search'],
                    data() {
                        return { valuelocal: this.value };
                    },
                    watch: {
                        valuelocal() {
                            this.$emit('search', this.valuelocal);
                        }
                    }
                }
            }
        }
    });

    // eng
    const engine = new Rete.Engine('demo@0.1.0');
    // const modules = {};
    // editor.use(ModulePlugin.default, { engine, modules });

    // comp
    const inputComponent = new InputComponent();
    editor.register(inputComponent);
    engine.register(inputComponent);

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
