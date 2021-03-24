
import Rete     from 'rete';
import Vue      from 'vue';
import vSelect  from 'vue-select';
Vue.component('v-select', vSelect);
import      DropDown from '../vue/DropDown';

class DropDownControl extends Rete.Control
{
    constructor(emitter, key, title, options) {
        super(key);

        // this.component = DropDown;
        this.component = DropDown;
        this.title = title;
        this.selected = options[0];

        this.props = {
            emitter,
            change: e => this.onChange(e),
            options,
            selected: this.selected
        };
    }

    onChange(e)
    {
        console.log('Selected', e);
        this.props.selected = e;
    }
}

export { DropDownControl };
