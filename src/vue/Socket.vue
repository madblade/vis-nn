<template lang="pug">
    .socket(
        :class="[type, socket.name, used ? 'used' : ''] | kebab",
        :title="socket.name+'\\n'+socket.hint"
    )
</template>


<script>
import VueRender from 'rete-vue-render-plugin';

export default {
    extends: VueRender.Socket,
    props: ['used']
}
</script>


<style lang="sass" scoped>
$socket-size: 16px
$socket-margin: 10px

.socket
    display: inline-block
    cursor: pointer
    border: 1px solid white
    border-radius: $socket-size/2.0
    width: $socket-size
    height: $socket-size
    //margin: $socket-margin !important
    vertical-align: middle
    background: #b3928a !important
    position: relative
    z-index: 2
    &.used
        background: #96b38a !important
    //&:after
    //    content: ''
    //    position: absolute
    //    width: 0
    //    height: 0
    //    top: $socket-size/4-1px
    //    left: $socket-size
    //    display: inline-block
    //    border-style: solid
    //    border-width: $socket-size/4 0 $socket-size/4 $socket-size/6
    //    border-color: transparent transparent transparent white
    &:hover
        border: 3px solid #fff
    &.multiple
        border-color: yellow
</style>
