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
                <div id="header_wrap" class="outer">
                    <header>
                        <div class="inner">
                            <a id="forkme_banner" href="https://github.com/AdonLee">View on GayHub</a>
                        </div>
                        <div class="container">
                            <h1 class="col-md-p" id="project_title"> Welcome to Yizhi's Corner</h1>
                            <h2 id="project_tagline" class="text-right">Learn to copy and paste, better import</h2>
                        </div>
                    </header>
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
        },
        'my-footer': {
            template: `
                <footer id="footer_wrap">
                    <div class="container">
                        <p class="text-center">
                            &copy;2014-2017 Adam Lee All Right Reserve
                        </p>
                    </div>
                </footer>
                `
        }

    }
})