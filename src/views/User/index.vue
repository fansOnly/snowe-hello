<template>
	<div class="flex">
		<div class="sidebar">
			<Sidebar />
		</div>
		<div class="container">
			<Header />
			<Main />
			<Footer />
		</div>
	</div>
</template>

<script>
import Sidebar from './Sidebar/index.vue'
import Header from './Header/index.vue'
import Main from './Main/index.vue'
import Footer from './Header/index.vue'


export default {
	name: 'User',
	components: {
		Header,
		Main,
		Sidebar,
		Footer
	},
}
</script>
<style scoped>
.flex {
	display: flex;
	height: 500px;
}
.sidebar {
	position: relative;
	width: 20%;
	height: 100%;
}
.sidebar::after {
	content: "";
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
	width: 0;
	border-right: 1px solid #f1f1f1;
}
.container {
	position: relative;
	width: 80%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
</style>
