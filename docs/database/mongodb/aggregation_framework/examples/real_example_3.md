# Example

```javascript

const aggregationPipeline = [
    {
        $match: {
            'channelInfo.name': 'website_chat',
            'channelInfo.metadata.offline': true,
        },
    },
    {
        $facet: {
            data: [
                { $skip: (page - 1) * this.DOCUMENTS_PER_PAGE },
                { $limit: this.DOCUMENTS_PER_PAGE },
            ],

            total: [{ $count: 'count' }],
        },
    },
];


```