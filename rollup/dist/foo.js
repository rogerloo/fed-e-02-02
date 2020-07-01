define(['require'], function (require) { 'use strict';

    // import _ from 'lodash-es'
    // import { log } from './logger'
    // import message from './message'
    // import { name, version } from '../package.json'
    // import cjs from './cjs-module'
    // const msg = message.hi

    // log(msg)
    // log(name)
    // log(version)
    // log(_.camelCase('hello world'))
    // log(cjs)

    new Promise(function (resolve, reject) { require(['./logger-38742386'], resolve, reject) }).then(({ log }) => {
        log('code splitting');
    });

});
