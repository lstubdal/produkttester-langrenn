export default {
    title: 'Skipar',
    name: 'skipair',
    type: 'document',
    fields: [
        {
            title: 'Nummer',
            name: 'number',
            type: 'number'
        },
        {
            title: 'Produkt',
            name: 'product',
            description: 'Skriv inn produkt brukt under testingen',
            type: 'string',
        },
        {
            title: 'Resultat',
            name: 'result',
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
