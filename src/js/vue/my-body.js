export default {
    template: `
        <div  class="container">
            <ul class="list-group">
                <li class="list-group-item list-group-item-heading">
                    <div class="checkbox"><input type="checkbox" v-model="selectAll"></div>
                    <div class="list-group-item-text">Cart</div>
                </li>
                <cart-item v-for="(item, index) in cart_items" :info="item" :index="index" @change="itemChange"></cart-item>
            </ul>
            <transition
                name="fade"
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut">
                <id-info v-if="isKJG" :info="identify"></id-info>
            </transition>
            <!-- <coupon-select v-bind:value="couponIndex" v-on:input="couponIndex = arguments[0]"></coupon-select> -->
            <!-- 等价 -->
            <coupon-select v-model="couponIndex" :coupons="coupons">
                <option slot="default" value="-1">不选择</option>
                <template slot="item" scope="props">
                    <option :value="props.index" v-text="props.coupon.desc"></option>
                </template>
            </coupon-select>

            <div>
                <p v-if="couponIndex > -1" transition="fade">代金券：-{{coupons[couponIndex].amount}}</p>
                <p :draggable="true">总额：{{total}}</p>
                <p :inner-text.prop="total"></p>
            </div>

        </div>`,
    data: function() {
        /* global cartData Vue*/
        cartData.coupons.forEach(coupon => {
            coupon.desc = `${coupon.coupon_name}-${coupon.coupon_type}-${coupon.intro}`
        })
        cartData.cart_items.forEach((item, index) => {
            item.checked = index == 0
        })
        return Object.assign(cartData, {
            couponIndex: -1,
            selectAll: false
        })
    },
    methods: {
        isBusiTypeOf: function(type) {
            var cart_items = this.cart_items.filter(item => item.checked)

            for (var i = 0, l = cart_items.length; i < l; ++i) {
                if (cart_items[i].business_type == type) {
                    return true;
                }
            }
            return false;
        },
        itemChange: function(index, info) {
            Object.assign(this.cart_items[index], {
                checked: info.checked,
                quantity: info.quantity
            })
            console.log('itemchange', index, info.checked, info.quantity);
        }
    },
    computed: {
        total: function() {
            var productValue = this.cart_items
                .filter(item => item.checked)
                .map(item => +item.unit_price * item.quantity)
                .reduce((item1, item2) => item1 + item2, 0)
            if (!productValue) return 0;
            if (this.couponIndex > -1) {
                var couponValue = +this.coupons[this.couponIndex].amount
                productValue -= couponValue
                if (productValue < 0) productValue = 0
            }
            return productValue
        },
        isKJG: function() {
            return this.isBusiTypeOf('kuajing')
        },
        isOversea: function() {
            return this.isBusiTypeOf('oversea')

        }
    }
}
