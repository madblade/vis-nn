
import Rete     from 'rete';
import Vue      from 'vue';
import vSelect  from 'vue-select';
Vue.component('v-select', vSelect);
import      DropDown from '../vue/DropDown';

class DropDownControl extends Rete.Control
{
    constructor(emitter, key, title, options, initial) {
        super(key);

        // this.component = DropDown;
        this.component = DropDown;
        this.title = title;
        this.value = initial || options[0];

        this.props = {
            emitter,
            ikey: key,
            change: e => this.onChange(e),
            options,
            initial,
            value: this.value
        };
    }

    setValue(value)
    {
        const ctx = this.vueContext || this.props;
        ctx.value = value;
    }

    getValue()
    {
        const ctx = this.vueContext || this.props;
        return ctx.value;
    }

    onChange(e)
    {
        // console.log('Selected', e);
        this.props.value = e;
        this.putData(this.props.ikey, e);
    }
}

export { DropDownControl };
