import Home from './views/Home.vue';
import FindTests from './views/FindTests.vue';
import WaxTech from './views/WaxTech.vue';
import Tester from './views/Tester.vue';
import PreviousTests from './components/PreviousTests.vue';
import Test from './components/Test.vue';

/* children*/
import NextRound from './components/NextRound.vue';
import Results from './views/Results.vue';

/* OBS FIKS ENGELSK OG NORSK KOMBINARSJON */
export default [
	{ 
		name: 'home', 		
		path: '/', 					
		component: Home 
	},
	{
		name: 'findTests',
		path: '/tidligere-tester',
		component: FindTests
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
	},
	{
		name: 'findTest',
		path: '/tidligere-tester/:typeOfTest',
		component: PreviousTests
	},
	{
		name: 'test',
		path: '/tidligere-tester/:testSlug',
		component: Test
	}
		
	
];

