/*global Vue VueRouter*/

var PageNotFound = {
    name: 'page-not-found',
    template: `
        <div class="alert text-center">
            <h3>404 not found or sth is coming</h3>
        </div>
    `
}

var router = new VueRouter({
    routes: [{
        path: '/resume',
        component: {
            name: 'resume',
            props: ['src'],
            template: `
                <div v-html="content"></div>
            `,
            data: function() {
                return {
                    content: ''
                }
            },
            created: function() {
                fetch('data/resume.md')
                    .then(resp => resp.text())
                    .then(resume => {
                        this.content = window.marked(resume)
                    })
            }
        }

    }, {
        path: '*',
        component: PageNotFound
    }]
})

new Vue({
    el: '#app',
    router,
    data: {

    },
    components: {
        "my-header": {
            template: `
            <div id="header_wrap">
                    <div class="container">
                        <ul class="nav nav-pills nav-justified">
                            <li>
                                <router-link to="/resume">Resume</router-link>
                            </li>
                            <li>
                                <router-link to="/vue">Vue 2.x</router-link>
                            </li>
                            <li>
                                <router-link to="/react">React</router-link>
                            </li>
                            <li>
                                <router-link to="/angular">Angular 1.x</router-link>
                            </li>
                            <li>
                                <a href="//wd.yizhi.com/">WordPress</a>
                            </li>
                        </ul>
                    </div>
                </div>
            `
        }

    }
})