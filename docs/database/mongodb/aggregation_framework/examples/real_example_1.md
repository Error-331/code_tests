# Example

Initial data:

```javascript

[
    {
        _id: new ObjectId("some"),
        last_message_timestamp: 1,
        messages: {
            _id: new ObjectId("some"),
            parent_chat: new ObjectId("some"),
            status: 1,
            timestamp: 1725524639274
        }
    },
    {
        _id: new ObjectId("some"),
        last_message_timestamp: 1,
        messages: {
            _id: new ObjectId("some"),
            parent_chat: new ObjectId("some"),
            status: 1,
            timestamp: 1
        }
    }
]

```

Aggregation:

```javascript

        const aggregationPipeline = [
            { $project: { _id: 1, last_message_timestamp: 1, hasMessageError: 1 } },
            {
                $match: {
                   // hasMessageError: true,
                    last_message_timestamp: { $gte: Date.now() - interval },
                   // messages: { $exists: true, $ne: [] }
                },
            },
            {
                $lookup:
                    {
                        from: await getCollectionName(context, MESSAGES_COLLECTION),
                        as: 'messages',
                        let: { id: '$_id', lastMessageTimestamp: '$last_message_timestamp' },
                        pipeline: [
                            { $project: { _id: 1, parent_chat: 1, status: 1, timestamp: 1 } },

                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: [ '$parent_chat', '$$id' ] },
                                            //{ $in: [ '$status', [ MESSAGE_STATUS.MESSAGE_FAILED, MESSAGE_STATUS.CHANNEL_FAILED ] ] },
                                            { $in: [ '$status', [ MESSAGE_STATUS.MESSAGE_ACCEPTED ] ] },
                                            { $eq: [ '$timestamp', '$$lastMessageTimestamp' ] },
                                        ],
                                    },
                                },
                            },
                            { $limit: 1 }
                        ],
                    },

            },
            {
                $unwind: {
                    path: '$messages',
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