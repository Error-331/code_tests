'use strict';

const $bodyNode = document.querySelector('body');
const treeWalker = document.createTreeWalker($bodyNode, NodeFilter.SHOW_ELEMENT, null, false);

do {
    const $currentNode = treeWalker.currentNode;
    const currentNodeDataset = $currentNode.dataset;

    const blockType = currentNodeDataset.blockType;
    const templateBackground = currentNodeDataset.templateBackground;

    let computedStyles = null;

    if (typeof blockType === 'string' && blockType === 'mrss') {
        computedStyles = window.getComputedStyle($currentNode, null);
        alert(
            `
                Block type: '${blockType}' 
                at ${treeWalker.currentNode.tagName}, 
                box data: ${JSON.stringify(treeWalker.currentNode.getBoundingClientRect())}
                width: ${computedStyles.getPropertyValue('width')},
                height:  ${computedStyles.getPropertyValue('height')},
            `,

        );
    } else if (typeof templateBackground === 'string') {
        computedStyles = window.getComputedStyle($currentNode, null);
        alert(
            `
                Template background: '${templateBackground}' 
                at ${treeWalker.currentNode.tagName}, 
                box data: ${JSON.stringify(treeWalker.currentNode.getBoundingClientRect())}
                width: ${computedStyles.getPropertyValue('width')},
                height:  ${computedStyles.getPropertyValue('height')},
            `,

        );
    }
} while (treeWalker.nextNode());


