/**
 * @NApiVersion 2.1
 *
 * Version    Date          Author           Remarks
 * 1.00       6 Oct 2021    Sergei Selihov
 *
 */
define([
    './../../libs/vendor/moment',
    '../misc/general_utils.js',
    ],
    (moment, { isNullOrEmpty }) => {
        const getUTCDate = (dateToConvert) => {
            let now = moment();

            if(!isNullOrEmpty(dateToConvert)){
                now = moment(dateToConvert);
            }

            return now.utc().format();
        }

        const transformUTCDateToPSTDate = (dateSOAP) => {
            if( isNullOrEmpty( dateSOAP ) )
                return dateSOAP;
            else
                return moment(dateSOAP).tz('America/Los_Angeles').format();
        }

        const sortDatesASCCallback = (firstDateStr, secondDateStr) => {
            const firstDate = moment(firstDateStr);
            const secondDate = moment(secondDateStr);

            if (firstDate.isSame(secondDate)) {
                return 0;
            }

            return firstDate.isAfter(secondDate) ? 1 : -1;
        }

        return {
            getUTCDate,
            transformUTCDateToPSTDate,
            sortDatesASCCallback,
        }
    });
