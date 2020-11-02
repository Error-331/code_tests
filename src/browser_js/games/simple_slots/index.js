'use strict';

import { Observable,  animationFrameScheduler, observeOn, of, merge, interval } from 'rxjs';
import { repeat } from 'rxjs/operators';

import { getRefToState, resetState, } from './src/store';


/*const c = of(null, animationFrameScheduler)
    .pipe(
        repeat()
    )
    .subscribe({
        next(nextVal) { console.log(`Next val (observer 2): ${nextVal}`) },
        error(error) { console.error('Error occurred (observer 2): ' + error); },
        complete() { console.log('Flow is ended (observer 2)'); } // may not be called if unsubscribed
    });*/

//c.complete();

/*




const b1 = new Observable((proxyObserver) => {
    proxyObserver.next(1);
    proxyObserver.next(2);
    proxyObserver.next(3);
    proxyObserver.complete();
}).pipe(
    observeOn(b)
);

b1.subscribe({
    next(nextVal) { console.log(`Next val (observer 2): ${nextVal}`) },
    error(error) { console.error('Error occurred (observer 2): ' + error); },
    complete() { console.log('Flow is ended (observer 2)'); } // may not be called if unsubscribed
})*/

const renderScene = () => {

    const canvas = document.getElementById('main_canvas');
    const context = canvas.getContext('2d');

    context.strokeStyle = 'green';
    context.fillStyle = 'brown';
    context.lineWidth = 5;

    context.rect(5, 5, 80, 80);
    context.stroke();
    context.fill();


    context.font = '34px Arial';
    context.strokeStyle = 'black';
    context.fillStyle = 'gold';
    context.lineWidth = 0.75;
    context.textAlign = 'center';

    const textMessage = '2D';

    context.fillText(textMessage, 38, 38);
    context.strokeText(textMessage, 38, 38);

};

resetState();

const $canvas = document.getElementById('main_canvas');

$canvas.style.width = '1800px';
$canvas.style.height = '800px';

animationFrameScheduler.schedule(function(h) {
    this.schedule(2);

    renderScene();
}, 0, 0);



