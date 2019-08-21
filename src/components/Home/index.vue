<template>
    <div>
        <comp-featured />
        <comp-content />
    </div>
</template>

<script>
import compFeatured from './featured';
import compContent from './content';

    export default {
        name: "index",
        components:{
            compFeatured,
            compContent
        }
    }
</script>

<style scoped>

</style>