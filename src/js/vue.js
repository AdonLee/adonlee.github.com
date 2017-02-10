/* global Vue*/
// import MyBodyComponent from './vue/my-body'
// import MyHeaderComponent from './vue/my-header'
// import MyFooterComponent from './vue/my-footer'
// import MinusPlusComponent from './vue/minus-plus'
// import CartItemComponent from './vue/cart-item'
// import CouponSelectComponent from './vue/coupon-select'
// import IdInfoComponent from './vue/id-info'

// Vue.component('my-body', MyBodyComponent)
// Vue.component('minus-plus', MinusPlusComponent)
// Vue.component('id-info', IdInfoComponent)
// Vue.component('cart-item', CartItemComponent)
// Vue.component('coupon-select', CouponSelectComponent)
// Vue.component('my-header', MyHeaderComponent)
// Vue.component('my-footer', MyFooterComponent)

Vue.component('slave', {
    props: ['info'],
    template: `
        <li class="list-group-item" style="overflow:visible;cursor:pointer"
            :style="{display: info.hidden?'none':'block'}">
            <div draggable="true"
                @dragstart="onDragStart($event)">
                <span v-text="info.Name"></span>
            </div>
        </li>
    `,
    methods: {
        onDragStart() {
            event.dataTransfer.effectAllowed = "move"

            // this.info.hidden = true
        }
    }
})

Vue.component('master', {
    props: ['info'],
    template: `
        <ul class="list-group">
            <li class="list-group-item">
                <ul class="list-group">
                    <li class="list-group-item list-group-item-heading"
                        v-text="info.Name"></li>
                    <slave
                        v-for="(srt, index) in info.suppliers"
                        :info="srt" :hidden="info.hideSupplier"></slave>
                </ul>
            </li>
        </ul>
    `
})

Vue.component('hotel', {
    props: {
        info: {
            type: Object
        }
    },
    // data: function(props) {

    //     return {
    //         hotel: this.info
    //     }
    // },
    template: `
        <div class="row">
            <div class="col-md-7">
                <p v-text="info.ChineseName"></p>
                <master v-for="(drt, drtID) in info.roomTypesObj"
                    :info="drt"></master>
            </div>
            <div class="col-md-5"></div>
        </div>
    `
})


new Vue({
    el: '#cart_wrapper',        //query string | HTMLElement
    created: function() {
        fetch('/data/mapping.json')
        .then(response => {
            return response.json()
        })
        .then(hotel => {
            this.hotel = hotel
        })
    },
    // components: ['hotel'],
    data: {
        hotel: {}
    },
    // template: `<div class="container-fluid">
    //     <hotel :info="hotel"></hotel>
    // </div>`,
    // data: {name: 'yizhi'},
    // props: [],
    // propsData: {},
    // computed: {},
    // methods: {},
    // watch: {},
    // template: '',
    // render: function() {},

    // beforeCreate: function() {},
    // created: function() {},
    // beforeMount: function() {},
    // mounted: function() {},
    // beforeUpdate: function() {},
    // updated: function() {},
    // activated: function() {},
    // deactivated: function() {},
    // beforeDestroy: function() {},
    // destroyed: function() {},

    // directives: [],
    // filters: [],
    // components: [],
    // parent: {},
    // mixins: {},
    // name: '',
    // extends: {},
    // delimiters: [],
    // functional: '',
})



// Vue.transition('fade', {
//   css: false,
//   enter: function (el, done) {
//     // 元素已被插入 DOM
//     // 在动画结束后调用 done
//     $(el)
//       .css('opacity', 0)
//       .animate({ opacity: 1 }, 1000, done)
//   },
//   enterCancelled: function (el) {
//     $(el).stop()
//   },
//   leave: function (el, done) {
//     // 与 enter 相同
//     $(el).animate({ opacity: 0 }, 1000, done)
//   },
//   leaveCancelled: function (el) {
//     $(el).stop()
//   }
// })
// var

