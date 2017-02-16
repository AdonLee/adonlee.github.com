<script>

    export default {
        props: {
            info: {
                type: Object,
                require: false
            }
        }
    }
</script>

<template>
    <div class="form-inline">

        <div class="input-group">
            <label for="">姓名</label>
            <input type="text" name="name" v-model="info.name">
        </div>
        <div class="input-group">
            <label for="">身份证</label>
            <input type="text" name="id_number" v-model="info.id_number">
        </div>
        <div class="input-group">
            <label for="">邮箱</label>
            <input type="text" name="email" v-model="info.email">
        </div>
    </div>

</template>
