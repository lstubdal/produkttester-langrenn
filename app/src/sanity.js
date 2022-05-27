import sanityClient from '@sanity/client';

export default sanityClient({
    projectId: '4rt7aync',
    dataset: 'production',
    apiVersion: '2022-05-04',
    token: import.meta.env.VITE_SANITY,
    useCdn: false,
})

// fetch from sanity
/* export const readClient = sanityClient({
projectId: '4rt7aync',
dataset: 'production',
useCdn: true
}) */


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


