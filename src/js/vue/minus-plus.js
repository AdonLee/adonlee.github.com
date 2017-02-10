export default {
    template: `
        <div class="input-group pull-right" style="width: 120px">
            <span class="input-group-addon glyphicon glyphicon-minus" @click="$emit('input', --m_count)"></span>
            <input type="number" v-model="m_count" class="form-control">
            <span class="input-group-addon glyphicon glyphicon-plus" @click="$emit('input', ++m_count)"></span>
        </div>`,
    props: ['count'],
    data: function() {
        return {
            m_count: + this.count || 0
        }
    }
}
