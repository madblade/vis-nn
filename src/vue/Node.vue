<template lang="pug">
    .node
        .title {{node.name}}
        .content
            .column(v-if='node.controls.size > 0 || node.inputs.size > 0')
                .inputs(v-for='input in inputs()')
                    Socket(v-socket:input="input", type="input", :socket="input.socket", :used="input.connections.length > 0")
                    .input-title(v-show='!input.showControl()') {{input.name}}
                    .input-control(v-show='input.showControl()', v-control='input.control')

            .column
                .outputs(v-for='output in outputs()')
                    .output-title {{output.name}}
                    Socket(v-socket:output="output", type="output", :socket="output.socket", :used="output.connections.length > 0")

        table.content
            tr(v-for='control in controls()')
                td.column
                    .control-label(style='text-align: center')
                        .control-title(v-show="true") {{control.title}}
                td.column
                    .control(style='text-align: center',
                    v-control='control')
                    //.control(v-for='control in controls()',
                        //:style='{ width: control.parent.width - 2 * control.margin, height: control.height }',
</template>

<script>
import VueRender from 'rete-vue-render-plugin';
import Socket from './Socket.vue';

export default {
    mixins: [VueRender.mixin],
    components: {
        Socket
    }
}
</script>

<style lang="sass" scoped>
$node-color: rgba(35,35,35,0.7)
$color-active: darken($node-color,5%)
$title-light: rgba(0, 255, 0,0.5)
$title-light-transparent: rgba(0, 255, 0,0.0)
$group-color: rgba(15,80,255,0.2)
$group-handler-size: 40px
$group-handler-offset: -10px
$context-menu-round: 7px
$socket-size: 16px
$socket-margin: 10px

.node
    background-color: transparent !important
    border-radius: 3px 3px 0 0 !important
    border: 1px solid transparent !important
    cursor: pointer
    display: inline-block
    height: auto
    //padding-bottom: 6px
    box-sizing: content-box
    box-shadow: 4px 5px 9px rgba(0, 0, 0, 0.2)
    &:hover
        //background: $node-color
        border-color: grey !important
    //&.active
    //&.active, &.selected
        //border-color: white !important
        //background: $color-active
        //border: 1px solid #ffd252
    .title
        color: #acadae !important
        background-color: rgba(91, 93, 96, 0.8) !important
        text-align: center
        font-family: 'Consolas', monospace !important
        font-size: 18px
        border-radius: 3px 3px 0 0
        padding: 8px
        overflow: hidden
    .content
        display: table
        background-color: #4c4e51 !important
        width: 100%
        .column
            display: table-cell
            white-space: nowrap
            &:not(:last-child)
                padding-right: 20px
    .inputs
        text-align: left
    .outputs
        text-align: right
    .input-title,.output-title
        vertical-align: middle
        color: white
        display: inline-block
        font-family: 'Consolas', monospace !important
        font-size: 14px
        margin: $socket-margin 0
        line-height: $socket-size
    .input-control
        z-index: 1
        vertical-align: middle
        display: inline-block
    .control-title
        padding-left: 20px
        color: #acadae
    .control
        width: 100%
        //padding: $socket-margin $socket-size/2 + $socket-margin
        padding: socket-margin $socket-size/2 + $socket-margin
        //.number-input
        //    border-radius: 3px
        //    background-color: transparent !important
</style>
