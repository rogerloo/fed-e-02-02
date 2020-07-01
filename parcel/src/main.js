// import $ from 'jquery'
import('jquery').then($ => {
    $(document.body).append('<h1>parcel~~~~</h1>')
})

import foo from './foo'
import './style.css'
foo.bar()


if (module.hot) {
    module.hot.accept(() => {
        console.log('hmr')
    })
}