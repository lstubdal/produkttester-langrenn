import Home from './views/Home.vue';
import FindTests from './views/FindTests.vue';
import WaxTech from './views/WaxTech.vue';
import Tester from './views/Tester.vue';
import Test from './components/Test.vue';
import Place from './views/Place.vue';
import Temperature from './views/Temperature.vue';
import Date from './views/Date.vue';

/* children*/
import NextRound from './components/NextRound.vue';
import Results from './views/Results.vue';

/* Handle if routes fail, or user types in wrong page/typos
	bugFix => not handleling all dynamic routes */
import PageNotFound from './views/PageNotFound.vue';

export default [
	{ 
		name: 'home', 		
		path: '/', 					
		component: Home 
	},
	{
		name: 'findTests',
		path: '/finn-test', // norwegian path names for user
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
				name: 'nextRound',
				path: ':round', 
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
		name: 'place',
		path: '/finn-test/sted',
		component: Place
	},
	{
		name: 'temperature',
		path: '/finn-test/temperatur',
		component: Temperature
	},
	{
		name: 'date',
		path: '/finn-test/dato',
		component: Date
	},
	{
		name: 'test',
		path: '/finn-test/test/:testSlug',
		component: Test
	},
	{
		name: 'pageNotFound',
		path: '/:catchAll(.*)', // routenames that don't match existing will be redirected to this view
		component: PageNotFound
	}	
];



