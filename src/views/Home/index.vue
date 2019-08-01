<template>
	<div>
		<img alt="Vue logo" src="../../assets/logo.png">
		<p class="s1">this is page Home.....</p>
		<router-link to="/foo">Foo</router-link>
		<router-link :to="{name: 'Bar'}">Bar</router-link>
		<router-link :to="{name: 'Biz', params: {id: 111}}">Biz</router-link>
		<router-link :to="{path: '/biz', query: {id: 111}}">Biz222</router-link>
		<router-link to="/bar/bar2">show bar2</router-link>
		<router-link to="/user">go to user</router-link>
	</div>
</template>

<script>
	export default {
		name: 'Home',
	}
</script>
<style scoped>
	.s1 {
		color: red;
		font-size: 40px;
	}
</style>
