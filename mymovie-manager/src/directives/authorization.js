import store from '../store'

const myDirective = {
    name: 'authorization',

    mounted(el, binding, vnode, prevVnode) {
        if (binding.value == true && store.state.user && !store.state.user.admin) {
            el.remove()
        }
    },
}

export default myDirective