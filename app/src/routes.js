import Home from './views/Home.vue';
import Tests from './views/Tests.vue';
import WaxTech from './views/WaxTech.vue';
import Tester from './views/Tester.vue';

export default [
	{ 
		name: 'home', 		
		path: '/', 					
		component: Home 
	},
	{
		name: 'tests',
		path: '/tidligere-tester',
		component: Tests
	},
	{
		name: 'waxTech',
		path: '/ny-test/smoerer',
		component: WaxTech
	},
	{
		name: 'tester',
		path: '/ny-test/tester',
		component: Tester
	}
];

