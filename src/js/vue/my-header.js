export default {
    template: `
        <nav class="navbar navbar-default">
            <div :class="fluid?'container-fluid':'container'">
                <div class="nav navbar-nav">
                    <li><a href="">link_1</a></li>
                    <li><a href="">link_2</a></li>
                    <li><a href="">about</a></li>
                    <li><a href="">resume</a></li>
                </div>
            </div>
        </nav>`,
    props: {
        fluid: Boolean
    }
}
