const Home  = () => import('../views/Home/index.vue')
const Foo  = () => import('../views/Foo/index.vue')
const Bar = () => import('../views/Bar/index.vue')
const NotFound = () => import('../components/notFound/404.vue')

const routes = [
	{
		path: '/',
		name: 'Home',
		components: Home
	},
	{
		path: '/foo',
		name: 'Foo',
		components: Foo
	},
	{
		path: '/bar',
		name: 'Bar',
		components: Bar
	},
	{
		path: '*',
		name: 'NotFound',
		components: NotFound
	}
]

export default routes;
