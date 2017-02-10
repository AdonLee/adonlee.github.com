export default {
    template: `
        <select name="" @change="change" v-model="couponIndex" class="form-control">
            <slot name="default"></slot> <!-- ng-transclud -->
            <slot name="item"
                v-for="(coupon, index) in coupons"
                :coupon="coupon" :index="index">
                <option value="">no [slot="item"] find</option>
            </slot>
        </select>`,
    props: {
        coupons: {
            type: Array,
            require: false
        },
        index: {
            type: Number,
            require: false,
            default: -1
        }
    },
    data: function() {
        return {
            couponIndex: this.index
        }
    },
    methods: {
        change: function() {
            // 更新v-model
            this.$emit('input', this.couponIndex)
        }
    }
}
