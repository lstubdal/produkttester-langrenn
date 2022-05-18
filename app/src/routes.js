import Home from './views/Home.vue';
import FindTests from './views/FindTests.vue';
import WaxTech from './views/WaxTech.vue';
import Tester from './views/Tester.vue';
import Test from './components/Test.vue';

import Place from './views/Place.vue';
import WeatherData from './views/WeatherData.vue';
import Date from './views/Date.vue';


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
		path: '/finn-test',
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
		name: 'place',
		path: '/finn-test/place',
		component: Place
	},
	{
		name: 'weatherData',
		path: '/finn-test/værdata',
		component: WeatherData
	},
	{
		name: 'date',
		path: '/finn-test/dato',
		component: Date
	},
	{
		name: 'test',
		path: '/finn-test/:testSlug',
		component: Test
	}
		
	
];

