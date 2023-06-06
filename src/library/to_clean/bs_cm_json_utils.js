/**
 * @NApiVersion 2.1
 *
 * Version    Date           Author           Remarks
 * 1.00       24 Jan 2021     Sergei Selihov
 *
 */
define([
        'N/format',
        'N/file',

        './general_utils.js'
    ],

    (
        format,
        file,

        { isNullOrEmpty, isArray, isObject }
    ) => {
        function prepareJSONFileObject(jsonData = {}, filename, options = {}) {
            const contents = (isArray(jsonData) || isObject(jsonData)) ? JSON.stringify(jsonData) : jsonData;

            const {
                filenamePrefix = 'generic_json_file',
                fileExtension = 'json',
                folder = 2681900,
            } = options;

            const today = format.format( { value: new Date(), type: format.Type.DATETIME } );
            return file.create({
                name: isNullOrEmpty(filename) ? `${filenamePrefix}_${today}.${fileExtension}` : filename ,
                fileType: file.Type.JSON,
                contents,
                folder,
            });
        }

        function saveJSONToFile(jsonData = {}, filename, args) {
            const fileObj = prepareJSONFileObject(jsonData, filename, args);
            const formattedDate = format.format( { value: new Date(), type: format.Type.DATETIMETZ, timezone: format.Timezone.AMERICA_LOS_ANGELES } );

            fileObj.description = `{"date": "${formattedDate} (PST)"}`;
            return fileObj.save();
        }

        return {
            prepareJSONFileObject,
            saveJSONToFile,
        }
    });
