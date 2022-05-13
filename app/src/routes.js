import Home from './views/Home.vue';
import Tests from './views/Tests.vue';
import WaxTech from './views/WaxTech.vue';
import Tester from './views/Tester.vue';

/* children of Tester comp */
import NextRound from './components/NextRound.vue';
import Results from './views/Results.vue';

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
		path: '/smoerer',
		component: WaxTech
	},
	{
		name: 'tester',
		path: '/tester',
		component: Tester,
		children: [
			{ 
				name: 'nesteRunde',
				path: ':runde', 
				component: NextRound
			},
			{
				name: 'results',
				path: 'results',
				component: Results
			}
		]
	}
];

