import sanityClient from '@sanity/client';
// write to sanity 
export const writeClient = sanityClient({
    projectId: '4rt7aync',
    dataset: 'production',
    token: import.meta.env.VITE_SANITY,
    //token: process.env.SANITY_AUTH_TOKEN,
    useCdn: false,
    withCredentials: true
  })

// fetch from sanity
export const readClient = sanityClient({
projectId: '4rt7aync',
dataset: 'production',
useCdn: true
})


/*
// fetching from sanity
export default sanityClient({ 
    projectId: '4rt7aync', // unique project id
    dataset: 'production',
    apiVersion: '2022-05-04', 
    useCdn: 'true', // false local / true netlify
    withCredentials: true // for sanity muations
})
 */


