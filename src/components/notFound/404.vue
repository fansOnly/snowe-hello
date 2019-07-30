<template>
	<div class="notfound">
		<img src="https://gw.alipayobjects.com/zos/antfincdn/wsE2Pw%243%26L/noFound.svg" alt="404" />
		<br />
		<br />
		<h1>404</h1>
		<p>Sorry, the page you visited does not exist.</p>
	</div>
</template>

<script>
export default {
	name: 'notFound',
}
</script>
<style scoped>
.notfound {
	position: absolute;
	left: 0;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
	text-align: center;
}
</style>
