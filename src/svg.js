import svgJS from 'svg.js'
import 'svg.draw.js'
import 'svg.panzoom.js'
import 'svg.draggable.js'
import 'svg.draggy.js'
import 'svg.select.js'
import 'svg.resize.js'

export default {
 install: Vue => {
   Vue.prototype.$svg = svgJS
 }
}