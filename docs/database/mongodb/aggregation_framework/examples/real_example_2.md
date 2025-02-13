# Example

```javascript

const aggregationPipeline = [
    { $project: { _id: 1, timestamp: 1, metadata: 1, parent_chat: 1 } },
    {
        $match: {
            'metadata.deleteOn': { $lte: currentTimestamp },
        },
    },
    {
        $lookup: {
            from: await getCollectionName(context, CHATS_COLLECTION),
            as: 'chat',
            let: { parentChatId: '$parent_chat' },
            pipeline: [
                { $project: { _id: 1, last_message_timestamp: 1 } },
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: [ '$_id', '$$parentChatId' ] },
                            ],
                        },
                    },
                },
                { $limit: 1 },
            ],
        },
    },
    {
        $unwind: {
            path: '$chat',
        },
    },
    {
        $facet: {
            data: [
                { $limit: this.DOCUMENTS_PER_PAGE },
            ],

            total: [{ $count: 'count' }],
        },
    },
];

```