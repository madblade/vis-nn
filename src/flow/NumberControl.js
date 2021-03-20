
import Rete             from 'rete';
import VueNumberControl from '../vue/VueNumberControl';

class NumberControl extends Rete.Control
{
    constructor(emitter, key, title, type, readonly)
    {
        super(key);
        this.component = VueNumberControl;
        this.title = title;
        this.props = {
            emitter,
            ikey: key,
            type,
            readonly,
            change: () => this.onChange()
        };
        this.data.render = 'vue';
    }

    setValue(value)
    {
        const ctx = this.vueContext || this.props;
        ctx.value = value;
        console.log(value);
    }

    onChange() {
        console.log('change');
    }
}

export { NumberControl };
