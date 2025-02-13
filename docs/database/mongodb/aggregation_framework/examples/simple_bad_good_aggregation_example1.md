# Example

Example of bad aggregation config:

```javascript

[
    {
        "$project": {
            // Modify a field + add a new field
            "card_expiry": {"$dateFromString": {"dateString": "$card_expiry"}},
            "card_type": "CREDIT",
            
            // Must now name all the other fields for those fields to be retained
            "card_name": 1,
            "card_num": 1,
            "card_sec_code": 1,
            "card_provider_name": 1,
            "transaction_id": 1,
            "transaction_date": 1,
            "transaction_curncy_code": 1,
            "transaction_amount": 1,
            "reported": 1,
            
            // Remove _id field
            "_id": 0,
        }},
]

```

Example of good aggregation config:

```javascript

[
    {
        "$set": {
            // Modified + new field
            "card_expiry": {"$dateFromString": {"dateString": "$card_expiry"}},
            "card_type": "CREDIT",
        }},
    {
        "$unset": [
            // Remove _id field
            "_id",
        ]},
]


```

