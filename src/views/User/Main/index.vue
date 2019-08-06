<template>
	<div class="main">
		<div>
			<input type="text" v-model="msg" placeholder="请输入你想显示的内容" />
			<p class="s1">输入的内容是：{{msg}}</p>
		</div>
		<a-button @click="increament">点击了{{count}}次</a-button>
	</div>
</template>

<script>
import { Button } from 'ant-design-vue';

export default {
	name: 'Main',
	data () {
		return {
			msg: '',
			count: 0
		}
	},
	methods: {
		increament: function(e) {
			console.log('event', e)
			this.count++;
		}
	},
}
</script>
<style scoped>
.main {
	overflow: hidden;
}
</style>
