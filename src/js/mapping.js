/* global Vue*/
Vue.component('master-list', {
    template: `
        <div>
            <ul class="list-group" v-for="(master, masterId) in list">
                <li class="li list-group-item list-group-item-heading">
                    <master :info="master"></master>
                </li>
                <li class="list-group-item" v-for="slave in master.suppliers">
                    <slave :info="slave"></slave>
                </li>
            </ul>
        <div>
    `,
    props: {
        list: Object
    }
})

Vue.component('slave-list', {
    template: `
        <ul class="list-group">
            <li class="list-group-item" v-for="slave in list">
                <slave :info="slave"></slave>
            </li>
        </ul>
    `,
    props: {
        list: Array
    },
    methods: {

    }

})

Vue.component('master', {
    template: `<table class="table table-bordered table-striped">
        <tr>
            <td style="width: 9%"><span v-text="info.SupplierID"></span></td>
            <td style="width: 30%"><span v-text="info.Name"></span></td>
            <td style="width: 30%"><span v-text="info.Name_CN"></span></td>
            <td style="width: 30%">
                <span class="glyphicon glyphicon-plus"></span>
                <span class="glyphicon glyphicon-minus"></span>
                <span class="glyphicon glyphicon-ok"></span>
                <span class="glyphicon glyphicon-trash"></span>
            </td>
        </tr>

    </table>`,
    props: {
        info: Object
    }
})

Vue.component('slave', {
    template: `<ul class="list-unstyled list-inline">
        <li style="width: 9%"><span v-text="info.SupplierID"></span></li>
        <li style="width: 30%"><span v-text="info.Name"></span></li>
        <li style="width: 30%"><span v-text="info.Name_CN"></span></li>
        <li style="width: 30%"></li>
    </ul>`,
    props: {
        info: Object
    }
})



var mapping = new Vue({
    el: '#mapping',
    template: `<div class="row" >
            <div class="col-md-7">
                <master-list :list="masters"></master-list>
            </div>
            <div class="col-md-5">
                <slave-list :list="slaves"></slave-list>
            </div>
        </div>`,
    data: {
        info: {},
        masters: {},
        slaves: []
    },
    methods: {
        format: function(parentList, itemList, mapping) {}
    }
})

fetch('../data/mapping.json')
    .then(resp=>resp.json())
    .then(data => {
        mapping.info = data
        mapping.masters = data.roomTypesObj
        mapping.slaves = data.unMapedRoomTypeList
    })


