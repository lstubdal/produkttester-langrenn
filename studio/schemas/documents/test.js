import antallSkipar from "./antallSkipar" // import dropdown list of number of skipairs

export default {
    title: "Tester",
    name: "test",
    type: "document",
    fields: [
        {
            title: 'Testnavn',
            name: 'testnavn',
            type: 'string',
            description: 'Skriv inn navn på test',
            validation: Rule => Rule.required().min(1).error('Mangler navn på test!')
        },
        {
            title: 'Sted',
            name: 'sted',
            type: 'string',
            description: 'Skriv inn sted på test',
            validation: Rule => Rule.required().min(1).error('Må fylle inn sted')
        },
        {
            title: 'Dato',
            name: 'dato',
            type: 'date',
            description: 'Fyll inn dato testen gjennomføres',
            options: {
                dateFormat: 'DD-MM-YYYY' // tilpasset bruk i Norge
            },
            validation: Rule => Rule.required().error('Mangler dato')
        },
        {
            title: 'Temperatur',
            name: 'temperatur',
            type: 'number',
            description: 'Måles i celsius',
            validation: [
                Rule => Rule.required().error('Mangler temperatur'),
                Rule => Rule.precision(1).error('Kun ett desimal bak graden')
            ]
        },
        {
            title: 'Værdata',
            name: 'vaerdata',
            type: 'number',
            description: 'Måles i celsius',
            validation: [
                Rule => Rule.required().error('Mangler værdata'),
                Rule => Rule.precision(1).error('Kun ett desimal bak graden')
            ]
        },
        {
            title: 'Snødata',
            name: 'snoedata',
            type: 'object',
            description: 'Check av for type test',
            fields: [
                {
                    title: 'Klassisk',
                    name: 'klassisk',
                    type: 'boolean',
                    hidden: ({ parent, boolean }) => !boolean && parent?.skoeyting || parent?.skibytte  //hide field if testtype === 'skoeyte or skibytte'
                 
                },
                {
                    title: 'Skøyting',
                    name: 'skoeyting',
                    type: 'boolean',
                    hidden: ({ parent, boolean }) => !boolean && parent?.klassisk || parent?.skibytte
                    
                },
                {
                    title: 'Skibytte',
                    name: 'skibytte',
                    type: 'boolean',
                    hidden: ({ parent, boolean }) => !boolean && parent?.skoeyting || parent?.klassisk
                },
                {
                    title: 'I spor',
                    name: 'ispor',
                    type: 'string',
                    description: 'Eksempel format: 25%-29%',
                    hidden: ({ parent, boolean }) => !boolean && parent?.skoeyting || parent?.skoeyting === false && parent?.skibytte === false && parent?.klassisk === false //hide if testtype === 'skoeyting', or if no types selected
                },
                {
                    title: 'Utenfor spor',
                    name: 'uspor',
                    type: 'string',
                    description: 'Eksempel format: 25%-29%',
                    hidden: ({ parent, boolean }) => !boolean && parent?.klassisk || parent?.skoeyting === false && parent?.skibytte === false && parent?.klassisk === false //hide if testtype === 'klassisk, or if no types selected
                }
            ],
        },
        {
            title: 'Hvor mange skipar ble testet?',
            name: 'antallParTeste',
            type: 'number',
            options: {
                list: [
                    ...antallSkipar
                ]
            }
        },
        {
            title: 'Legg inn skipar',/* fix : `Legg inn ${parent.valueOfField('antallSkipar')} skipar`, */
            name: 'leggInnSki',
            description: 'Fyll inn verdi/smøring på skiparene',
            type: 'array',
            of: [{
                type: 'reference',
                to: [{ type: 'skipar' }] 
            }],
            
            // allows user to sort pair if wanted
            options: { 
                sortable: true
            },
            valdiation: Rule => Rule.Required().length(Rule.valueOfField('antallParTeste')) // reqired same number of items as number of skipairs selected
            // fungerer ikke
        }
    ]
}
