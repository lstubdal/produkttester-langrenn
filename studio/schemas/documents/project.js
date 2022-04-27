export default {
    title: "Project",
    name: "project",
    type: "document",
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            validation: Rule => Rule.required().min(1).error('Book must have title')
        }
    ]
}