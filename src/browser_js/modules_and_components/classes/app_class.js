'use strict';

// external imports

// local imports
import LongDivisionEurasiaCalcClass from './long_division_eurasia_calc_class.js';

// class implementation
class AppClass extends HTMLElement {
    // region static props
    // endregion

    // region private props
    // endregion

    // region constructor
    constructor() {
        super();

        // Get the reference to the template
        let templateReference = document.querySelector('#long-division-app-main-tpl');

        // Get the content node
        let templateContent = templateReference.content;

        let shadowRoot = this.attachShadow({mode: 'open'});

        // add a text node
        shadowRoot.append(templateContent.cloneNode(true));
    }

    // endregion

    // region business logic
    // endregion

    // region event handlers
    // endregion

    // region public methods
    run() {



        const strat1 = new LongDivisionEurasiaCalcClass(6359, 17); // 374
        const strat2 = new LongDivisionEurasiaCalcClass(127, 4); // 31.75
        const strat3 = new LongDivisionEurasiaCalcClass(500, 4); // 125

        strat1.calc();
        strat2.calc();
        strat3.calc();


    }

    // endregion

    // region state getter`s
    // endregion

    // region state setter`s
    // endregion
}

//
customElements.define('long-division-app', AppClass);

// exports
export default AppClass;