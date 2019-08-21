<template>
    <div class="container dashboard_container">
        <div class="admin_nav">
            <ul>
                <li><router-link to="/dashboard/add_posts">Add Posts</router-link></li>
                <li><router-link to="/dashboard/list_posts">Manage Posts</router-link></li>
            </ul>
        </div>
        <router-view />
    </div>
</template>

<script>

    export default {
        name: "index"
    }
</script>

<style scoped>

</style>