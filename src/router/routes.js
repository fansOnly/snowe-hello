const Home  = () => import('_v/Home/index.vue')
const Foo  = () => import('_v/Foo/index.vue')
const Bar = () => import('_v/Bar/index.vue')
const Bar2 = () => import('_v/Bar/Bar2/index.vue')
const Biz = () => import('_v/Biz/index.vue')

const User = () => import('_v/User/index.vue')
const UserFooter = () => import('_v/User/Footer/index.vue')
const UserHeader = () => import('_v/User/Header/index.vue')
const UserMenu = () => import('_v/User/Menu/index.vue')

const NotFound = () => import('_c/notFound/404.vue')

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/user',
		name: 'User',
		components: {
			default: User,
			UserHeader: UserHeader,
			UserFooter: UserFooter,
			UserMenu: UserMenu,
		}
	},
	{
		path: '/foo',
		name: 'Foo',
		component: Foo
	},
	{
		path: '/bar',
		name: 'Bar',
		component: Bar,
		children: [
			{
				path: '/bar/bar2',
				name: 'Bar2',
				component: Bar2
			}
		]
	},
	{
		path: '/biz/:id',
		name: 'Biz',
		component: Biz
	},
	{
		path: '*',
		name: 'NotFound',
		component: NotFound
	}
]

export default routes;
