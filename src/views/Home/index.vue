<template>
	<div>
		<img alt="Vue logo" src="../../assets/logo.png">
		<p class="s1">this is page Home....</p>
		<router-link to="/foo">Foo</router-link>
		<router-link :to="{name: 'Bar'}">Bar</router-link>
		<router-view></router-view>
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
