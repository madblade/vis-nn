
import Rete             from 'rete';
import Vue from 'vue';
import vSelect from 'vue-select';
Vue.component('v-select', vSelect);
// import      DropDown from '../vue/DropDown';

class DropDownControl extends Rete.Control
{
    constructor(emitter, key) {
        super(key);

        // this.component = DropDown;
        this.component = vSelect;

        this.props = {
            options: [
                'linear',
                'relu',
                'tanh',
                'sigmoid'
            ],
            setSelectedOption(e) { console.log('Selected', e); }
        };
    }
}

export { DropDownControl };
