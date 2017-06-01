<script>
    import marked from 'marked'
    export default {
        props: ['src'],
        data: function() {
            return {
                content: '',
                loading: true
            }
        },
        methods: {
            loadFile: function(src) {
                this.loading = true
                return fetch(src)
                    .then(resp => {
                        this.loading = false
                        if (resp.status != 200) console.log(resp.status, resp.statusText, resp.url)
                        return resp.text()
                    })
                    .then(
                        content => this.content = marked(content),
                        err => console.log(err))
            }
        },
        created: function() {
            this.loadFile(this.src)
        },
        watch: {
            src: function(newVal, oldVal) {
                if (newVal != oldVal) this.loadFile(newVal)
            }
        }
    }
</script>
<template>
    <div>
        <div v-html="content"></div>
        <div v-if="loading" class="loading loading-ring"></div>
    </div>
        
</template>