import sanityClient from '@sanity/client';

export default sanityClient({
    projectId: '4rt7aync',
    dataset: 'production',
    apiVersion: '2022-05-04',
    token: import.meta.env.VITE_SANITY, 
    useCdn: false,
})


