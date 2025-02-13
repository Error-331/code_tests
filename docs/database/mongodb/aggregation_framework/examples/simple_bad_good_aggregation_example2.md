# Example

Example of bad aggregation config:

```javascript

[
    {
        "$set": {
            // Add some fields
            "transaction_info.date": "$transaction_date",
            "transaction_info.amount": "$transaction_amount",
            "status": {
                "$cond": {
                    "if": "$reported",
                    "then": "REPORTED",
                    "else": "UNREPORTED"
                }
            }
        }
    },

    {
        "$unset": [
            // Remove _id field
            "_id",
            // Must name all other existing fields to be omitted
            "card_name",
            "card_num",
            "card_expiry",
            "card_sec_code",
            "card_provider_name",
            "transaction_id",
            "transaction_date",
            "transaction_curncy_code",
            "transaction_amount",
            "reported",         
        ]},
]

```

Example of good aggregation config:

```javascript

[
    {
        "$project": {
            // Add some fields
            "transaction_info.date": "$transaction_date",
            "transaction_info.amount": "$transaction_amount",
            "status": {"$cond": {"if": "$reported", "then": "REPORTED", "else": "UNREPORTED"}},

            // Remove _id field
            "_id": 0,
        }
    },
]

```