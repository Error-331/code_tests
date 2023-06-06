/**
 * @NApiVersion 2.1
 *
 * Version    Date           Author           Remarks
 * 1.00       25 Jan 2021    Sergei Selihov
 *
 */
define([
    'N/file'
    ],
    /**
 * @param{file} file
 */
    (file) => {
        function readFileObjSync(id) {
            return file.load({id});
        }

        function readFileSync(id) {
            const fileObj = file.load({id});
            return {
                description: fileObj.description,
                contents: fileObj.getContents(),
            };
        }

        function readJSONFileSync(id) {
            const { description, contents } = readFileSync(id);

            return {
                description,
                contents: JSON.parse(contents),
            }
        }

        return {
            readFileObjSync,
            readFileSync,
            readJSONFileSync,
        }
    });
