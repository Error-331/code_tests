'use strict';

class GeneralTreeNodeClass {
    public Object value();
    public boolean isLeaf();
    public GTNode parent();
    public GTNode leftmostChild();
    public GTNode rightSibling();
    public void setValue(Object value);
    public void setParent(GTNode par);

    insertFirst(GTNode n);
    insertNext(GTNode n);

    removeFirst();
    removeNext();

    constructor() {

    }
}

module.exports = GeneralTreeNodeClass;
