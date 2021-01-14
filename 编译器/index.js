const { interval } = require('rxjs')

const { take } = require('rxjs/operators')
interval(500).pipe(take(4)).subscribe(console.log)
