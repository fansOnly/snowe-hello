<template>
	<div>
        <p>路由参数为：{{$route.params.id}}</p>
		<router-link to="/bar/bar2">show bar2</router-link>
	</div>
</template>

<script>
	export default {
        name: 'Biz',
	}
</script>
<style scoped>
	.s1 {
		color: orange;
		font-size: 40px;
	}
</style>
