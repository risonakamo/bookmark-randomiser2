<script lang="ts">

</script>

<style lang="sass">
    @use "./session-create.sass"
</style>

<main>
    <div class="browser">
        <div class="path">
            /
            <div class="path-item"><a href="">thing</a></div>
            /
            <div class="path-item"><a href="">other thing</a></div>
        </div>
        <div class="folders">
            <div class="folder">
                <a href="">..</a>
            </div>
            <div class="folder">
                <input type="checkbox"/>
                <a href="">a folder</a>
            </div>
            <div class="folder">
                <input type="checkbox"/>
                <a href="">Another Folder</a>
            </div>
        </div>
    </div>
    <div class="checkout">
        <div class="items">
            <div class="checkout-item">
                <div class="name">
                    an item
                </div>
                <div class="count">
                    12
                </div>
            </div>
            <div class="checkout-item">
                <div class="name">
                    another / item
                </div>
                <div class="count">
                    120
                </div>
            </div>
        </div>
    </div>
</main>