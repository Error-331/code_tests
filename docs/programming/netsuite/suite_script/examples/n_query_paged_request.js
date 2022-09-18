/**
 * @NApiVersion 2.1
 */
define([
        'N/query',
    ],
    /**
     * @param{query} query
     */
    (
        query,

    ) => {
        const querySQL = `
            SELECT * FROM Subscriptions
        `;

        let resultSet = [];

        const resultIterator = query.runSuiteQLPaged({
            query: querySQL,
            pageSize: 500,
        }).iterator();

        resultIterator.each(function(page) {
            resultSet = resultSet.concat(page.value.data.asMappedResults());
            return true;
        });

        return resultSet;
    });