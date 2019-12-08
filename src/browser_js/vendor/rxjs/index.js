import { fromEvent } from 'rxjs';
import { filter, take } from 'rxjs/operators';

fromEvent(document, 'click')
    .pipe(
        filter(event => event.clientX > window.innerWidth / 2),
        take(10)

    )
    .subscribe(event => console.log('Click outside window.innerWidth / 2:', event.clientX, event.clientY));
