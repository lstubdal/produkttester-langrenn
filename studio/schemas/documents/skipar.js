export default {
    title: 'Skipar',
    name: 'skipar',
    type: 'document',
    fields: [
        {
            title: 'Nummer',
            name: 'nummer',
            type: 'number'
        },
        {
            title: 'Produkt',
            name: 'produkt',
            description: 'Skriv inn produkt brukt under testingen',
            type: 'string',
        },
        {
            title: 'Resultat',
            name: 'resultat',
            description: 'Skriv inn resultatet fra testingen, regnet ut fra verdi til beste skipar (tall verdi)',
            type: 'number',
        },
        {
            title: 'Ranking',
            name: 'ranking',
            description: 'Skriv inn ranking på gjeldene skipar fra testingen',
            type: 'number',
        }
    ]
}
