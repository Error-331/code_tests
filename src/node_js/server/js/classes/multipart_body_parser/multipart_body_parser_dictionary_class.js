'use strict';

const {
    MB_PARSER_INITIAL_STATE,
    MB_PARSER_CONTENT_PARSED_STATE,

    MB_PARSER_INITIAL_BOUNDARY_FOUND_STATE,
    MB_PARSER_NEXT_OR_FINAL_BOUNDARY_FOUND_STATE,
    MB_PARSER_BOUNDARY_FOUND_STATE,
    MB_PARSER_FINAL_BOUNDARY_FOUND_STATE,

    MB_PARSER_SEEK_BOUNDARY_HEADERS_START_STATE,
    MB_PARSER_SEEK_BOUNDARY_HEADERS_END_STATE,
} = require('./../../constants/multipart_body_parser/state_constants');


class MultipartBodyParserDictionaryClass {
    static transitionDictionary = [
        {
            src: MB_PARSER_INITIAL_STATE,
            dist: MB_PARSER_INITIAL_BOUNDARY_FOUND_STATE,
            test: (context) => context.testInitialBoundary(),
            transit: (context) => context.transitToInitialBoundaryFound(),
        },

        {
            src: MB_PARSER_INITIAL_BOUNDARY_FOUND_STATE,
            dist: MB_PARSER_SEEK_BOUNDARY_HEADERS_START_STATE,
            test: (context) => context.testHeadersStart(),
            transit: (context) => context.transitToHeadersStartFound(),
        },

        {
            src: MB_PARSER_SEEK_BOUNDARY_HEADERS_START_STATE,
            dist: MB_PARSER_SEEK_BOUNDARY_HEADERS_END_STATE,
            test: (context) => context.testHeadersEnd(),
            transit: (context) => context.transitToHeadersEndFound(),
        },

        {
            src: MB_PARSER_SEEK_BOUNDARY_HEADERS_END_STATE,
            dist: [
                MB_PARSER_BOUNDARY_FOUND_STATE,
                MB_PARSER_FINAL_BOUNDARY_FOUND_STATE,
                MB_PARSER_NEXT_OR_FINAL_BOUNDARY_FOUND_STATE,
            ],
            test: (context) => context.testNextOrEndBoundary(),
            transit: (context) => context.transitToNextOrEndBoundary(),
        },

        {
            src: MB_PARSER_NEXT_OR_FINAL_BOUNDARY_FOUND_STATE,
            dist: [
                MB_PARSER_BOUNDARY_FOUND_STATE,
                MB_PARSER_FINAL_BOUNDARY_FOUND_STATE,
                MB_PARSER_NEXT_OR_FINAL_BOUNDARY_FOUND_STATE,
            ],
            test: (context) => context.testNextOrEndBoundary(),
            transit: (context) => context.transitToNextOrEndBoundary(),
        },

        {
            src: MB_PARSER_BOUNDARY_FOUND_STATE,
            dist: MB_PARSER_SEEK_BOUNDARY_HEADERS_START_STATE,
            test: (context) => context.testHeadersStart(),
            transit: (context) => context.transitToHeadersStartFound(),
        },

        {
            src: MB_PARSER_FINAL_BOUNDARY_FOUND_STATE,
            dist: MB_PARSER_CONTENT_PARSED_STATE,
            test: (context) => context.testContentParsed(),
            transit: (context) => context.transitToContentParsed(),
        },

        {
            src: MB_PARSER_CONTENT_PARSED_STATE,
            dist: null,
            test: () => -1,
            transit: () => false,
        }

    ];

    static findTransitionByState(state) {
        return this.transitionDictionary.find(dictionaryEntity => {
            return dictionaryEntity.src === state;
        });
    }
}

module.exports = MultipartBodyParserDictionaryClass;
