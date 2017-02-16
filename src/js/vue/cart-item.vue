<template>
    <li class="list-group-item clearfix" :class="{'active': info.checked}">
        <div class="input-group">
            <div class="checkbox">
                <input type="checkbox" :value="info.id" v-model="checked" @change="change">
                <p draggable="true" @dragstart="info.alert='put me back'" @dragend="info.alert=''">{{info.alert || info.product_name}}</p>
            </div>
        </div>

        <div>
            <minus-plus v-model="quantity" :count="quantity" @input="change">
            <span v-text="info.unit_price"></span>
        </div>
    </li>

</template>
<script>
    import MinusPlus from './minus-plus.vue'
    export default {
        components: {MinusPlus},
        props: {
            info: {
                type: Object,
                require: true,
                // validator: function() {}
                // default: {}
            },
            index: {
                type: Number
            }
        },
        data: function() {
            return {
                quantity: this.info.quantity,
                checked: this.info.checked,
            }
        },
        methods: {
            change: function() {
                this.$emit('change', this.index, this.$data)
            }
        },
        // watch: {
        //     name: function(new, old) {}
        // }
    }

</script>
