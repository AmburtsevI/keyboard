<script lang="ts">
    export let layout:string[][] = [];
</script>

<div class=keyboardWrapper>
    <div class="keyboard">
        {#each layout as row}
            <div class="row">
                {#each row as key}
                    <button>{key}</button>
                {/each}
            </div>
        {/each}
    </div>
</div>

<style lang="scss">

    // .keyboardWrapper {
        // width: 360px;
        // display: flex;
    // }
    .keyboard {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .row {
        display: flex;
        gap: 6px;
        // row-gap: 2px;
    }

    button {
        width: 78px;
        height: 63px;
        box-sizing: border-box;
        padding: 0px 5px 5px 5px;
        // border: none;
        font-size: 30px;
        line-height: 30px;
        border-radius: 0px;
    }
</style>
  