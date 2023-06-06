
define([
        'N/xml',

        './general_utils.js'
    ],
    (
        xml,
        { isNullOrEmpty }
    ) => {
        //#region tagged templates

        const nml_ = (strings) => {
            return `[local-name() = "${strings[0]}"]`;
        };

        const nmchain_ = (strings) => {
            const splittedStrings = strings[0].split(' ');

            return splittedStrings
                .reduce(
                    (tagChain, tag, currentIndex) => {
                        if ((currentIndex + 1) < splittedStrings.length) {
                            return  tagChain + `[local-name() = "${tag}"]/*`;
                        } else {
                            return tagChain + `[local-name() = "${tag}"]`;
                        }
                    },
                    ''
                );
        };

        //#endregion tagged templates

        //#region utility functions
        function findTags(node, xpath, axis = '') {
            const $resultNodes = xml.XPath.select({ node, xpath: `${axis}${xpath}` });

            if ($resultNodes.length === 0) {
                return null;
            } else {
                return $resultNodes;
            }
        }

        function findSingleTag(node, xpath, axis = ''){
            const $resultNodes = findTags(node, xpath, axis);

            if (isNullOrEmpty($resultNodes)) {
                return null;
            } else {
                return $resultNodes[0];
            }
        }

        function findSingleTagTextByNMChain(node, nmChain, axis = '') {
            return findSingleTag(node, nmchain_([nmChain]), axis)?.textContent;
        }

        function findTagsByNMChainFromCurrent(node, nmChain, axis = '') {
            return findTags(node, `*${nmchain_([nmChain])}`, axis);
        }

        function findSingleTagByNMChainFromCurrent(node, nmChain, axis = '') {
            return findSingleTag(node, `*${nmchain_([nmChain])}`, axis);
        }

        function findSingleTagValueByNMChainFromCurrent(node, nmChain, axis = '') {
            return findSingleTagByNMChainFromCurrent(node, nmChain, axis)?.nodeValue;
        }

        function findSingleTagTextByNMChainFromCurrent(node, nmChain, axis = '') {
            return findSingleTagByNMChainFromCurrent(node, nmChain, axis)?.textContent;
        }

        function findAllTagsFromCurrent($rootNode, tagsArr, axis = ''){
            return tagsArr
                .reduce(
                    (dataObject, tag) => {
                        const $tag = findSingleTag($rootNode, `*[local-name() = "${tag}"]`, axis);
                        dataObject[tag] = $tag?.textContent;

                        return dataObject;
                    },
                    {}
                );
        }

        //#endregion utility functions

        return {
            nml_,
            nmchain_,

            findTags,
            findSingleTag,
            findSingleTagTextByNMChain,

            findTagsByNMChainFromCurrent,

            findSingleTagByNMChainFromCurrent,

            findSingleTagValueByNMChainFromCurrent,
            findSingleTagTextByNMChainFromCurrent,

            findAllTagsFromCurrent,
        }
    });
