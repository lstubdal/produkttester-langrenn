/* 
    Test.js is developed for users to add tests from previous years, and or to add the current test if system not used during testing.
*/
import numberOfSkipairs from "./numberOfSkipairs"

export default {
    title: "Tester",
    name: "test",
    type: "document",
    fields: [
        {
            title: 'Testnavn',
            name: 'name',
            type: 'string',
            description: 'Skriv inn navn på test eller skirenn',
            validation: Rule => Rule.required().min(1).error('Mangler navn på test!')
        },
        {
            title: 'Sted',
            name: 'place',
            type: 'string',
            description: 'Skriv inn sted på test',
            validation: Rule => Rule.required().min(1).error('Må fylle inn sted')
        },
        {
            title: 'Dato',
            name: 'date',
            type: 'date',
            description: 'Fyll inn dato testen gjennomføres',
            options: {
                dateFormat: 'DD-MM-YYYY' // tilpasset bruk i Norge
            },
            validation: Rule => Rule.required().error('Mangler dato')
        },
        {
            title: 'Temperatur (værdata)',
            name: 'temperature',
            type: 'number',
            description: 'Måles i celsius',
            validation: [
                Rule => Rule.required().error('Mangler temperatur'),
                Rule => Rule.precision(1).error('Kun ett desimal bak graden')
            ]
        },
        {
            title: 'Snødata',
            name: 'snowdata',
            type: 'object',
            description: 'Velg type test',
            fields: [
                {
                    title: 'Klassisk',
                    name: 'classic',
                    type: 'boolean',
                    hidden: ({ parent, boolean }) => !boolean && parent?.skating || parent?.skichange  //hide field if testtype === 'skoeyte or skichange'
                 
                },
                {
                    title: 'Skøyting',
                    name: 'skating',
                    type: 'boolean',
                    initialValue: {
                        featured: true
                      },
                    hidden: ({ parent, boolean }) => !boolean && parent?.classic || parent?.skichange
                    
                },
                {
                    title: 'Skibytte',
                    name: 'skichange',
                    type: 'boolean',
                    hidden: ({ parent, boolean }) => !boolean && parent?.skating || parent?.classic
                },
                {
                    title: 'I spor',
                    name: 'inTrack',
                    type: 'string',
                    description: 'Eksempel format: 25%-29%',
                    hidden: ({ parent, boolean }) => !boolean && parent?.skating || parent?.skating === false && parent?.skichange === false && parent?.classic === false //hide if testtype === 'skating', or if no types selected
                },
                {
                    title: 'Utenfor spor',
                    name: 'outsideTrack',
                    type: 'string',
                    description: 'Eksempel format: 25%-29%',
                    hidden: ({ parent, boolean }) => !boolean && parent?.classic || parent?.skating === false && parent?.skichange === false && parent?.classic === false //hide if testtype === 'classic, or if no types selected
                }
            ],
        },
        {
            title: 'Hvor mange skipar ble testet?',
            name: 'numberOfPairs',
            type: 'number',
            options: {
                list: [
                    ...numberOfSkipairs
                ]
            }
        },
        {
            title: 'Legg inn alle skipar',
            name: 'addedSkipairs',
            description: 'Fyll inn verdi/smøring på skiparene',
            type: 'array',
            of: [
                {
                    title: 'Skipar',
                    name: 'skipair',
                    type: 'object',
                    fields: [
                        {
                            title: 'Produkt',
                            name: 'product',
                            type: 'string'
                        },
                        {
                            title: 'Resultat (differanse)',
                            name: 'result',
                            type: 'number'
                        }
                    ]

                }
            ],
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
                source: 'navn',
                slugify: input => input
                         .toLowerCase()
                         .replace(/\s+/g, '-')
                         .slice(0, 200)
            }
        }
    ]
}
