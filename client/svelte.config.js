// import adapter from "@sveltejs/adapter-auto";
// import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	kit: {
// 		adapter: adapter(),
// 		// csrf: {
// 		// 	checkOrigin: false,
// 		// }
// 	},

// 	preprocess: [vitePreprocess({})],
// };



import cloudflare from '@sveltejs/adapter-cloudflare'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: cloudflare(),

		target:"#svelte"
		// csrf: {
		// 	checkOrigin: false,
		// }
	},
}

export default config;