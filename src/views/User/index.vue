<template>
	<div>
		<p class="s1">this is page User......</p>
		<router-link to="/user">show user</router-link>
		<router-view></router-view>
		<router-view name='userHeader'></router-view>
		<router-view name='userFooter'></router-view>
		<router-view name='userMenu'></router-view>
	</div>
</template>

<script>

export default {
	name: 'User',
}
</script>
<style scoped>
.s1 {
	color: red;
	font-size: 40px;
}
</style>
