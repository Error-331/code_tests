'use strict';

class RegularGeneralTreeNodeChildrenIteratorClass {
    #childrenLinkedList = null;

    [Symbol.iterator]() {
        if (this.#childrenLinkedList === null) {
            return {
                next: function() {
                    return {
                        done: true
                    };
                }
            }
        } else {
            const linkedListIterator = this.#childrenLinkedList[Symbol.iterator]();
            let linkedListNode = null;

            return {
                next: function() {
                    linkedListNode = linkedListIterator.next();

                    if (linkedListNode.done) {
                        return {
                            done: true
                        };
                    } else {
                        return {
                            value: linkedListNode.value.element,
                            done: false
                        };
                    }
                }
            }
        }
    }

    constructor(childrenLinkedList) {
        this.#childrenLinkedList = childrenLinkedList;
    }
}

module.exports = RegularGeneralTreeNodeChildrenIteratorClass;
