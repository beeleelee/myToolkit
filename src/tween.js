import tick from './tick'
import performanceNow from './performanceNow'
import * as TimeFunction from './internal/_easing'

const linearEase = a => a

/**
 * @class Tween - simple animation
 *    
 * @example
 * new Tween({
 *  duration: 500,
 *  onStep: (t, percent) => {
 *    console.log(percent)
 *  },
 *  onEnd: () => {
 *    console.log('tween end')
 *  }
 * })
 */
export class Tween {
  constructor(options) {
    this.startTime = 0
    this.currentTime = 0
    this.percent = 0
    this.setOptions(options)
    this.step = this.step.bind(this)
  }
  setOptions(options = {}) {
    let {
      duration = 0,
      ease,
    } = options
    this.duration = duration
    this.ease = TimeFunction[ease] || linearEase
    this.options = Object.assign({}, this.options, options)
  }
  /**
   * @todo add support for restart after pause
   */
  start() {
    this.startTime = this.currentTime = performanceNow()
    this.clockId = tick.add(this.step)
    return this
  }
  pause() {
    tick.remove(this.clockId)
    this.clockId = null
  }
  stop() {
    tick.remove(this.clockId)
    this.clockId = null
    this.percent = 0
    if (this.options.onEnd) {
      this.options.onEnd(this)
    }
    // console.log('tween stop')
  }
  step(time) {
    this.currentTime = time
    let span = time - this.startTime
    let leftTime = this.duration - span
    let shouldStop = false
    if (leftTime > 0) {
      //console.log(span / this.duration)
      this.percent = span / this.duration
    } else {
      this.percent = 1
      shouldStop = true
    }
    if (this.options.onStep) {
      this.options.onStep(this, this.ease(this.percent))
    }
    if (shouldStop) {
      this.stop()
    }
  }
}

export default Tween 