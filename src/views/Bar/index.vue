<template>
	<div>
		<p class="s1">this is page Bar......</p>
		<router-link to="/bar/bar2">show bar2</router-link>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'Bar',
}
</script>
<style scoped>
.s1 {
	color: orange;
	font-size: 40px;
}
</style>
