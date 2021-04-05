
import Rete             from 'rete';
import VueNumberControl from '../vue/VueNumberControl';

class NumberControl extends Rete.Control
{
    constructor(emitter, key, title, type, readonly, initial)
    {
        super(key);
        this.title = title;
        this.component = VueNumberControl;
        this.props = {
            emitter,
            ikey: key,
            type,
            readonly,
            initial,
            change: () => this.onChange()
        };
        this.data.render = 'vue';
    }

    setValue(value)
    {
        const ctx = this.vueContext || this.props;
        ctx.value = value;
        // console.log(value);
    }

    getValue()
    {
        const ctx = this.vueContext || this.props;
        return ctx.value;
    }

    onChange() {
        // console.log('change');
    }
}

export { NumberControl };
