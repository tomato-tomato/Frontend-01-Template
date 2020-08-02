# 每周总结可以写在这里
## 手势
- touchEvent 跟 mouseEvent 不同，主要描述手指在触摸平面的状态变化
- touchEvent 中 x、y的值，存在 changedTouches 属性的 touch 属性中
- touchcancel 和 touchend 总会触发一个
- 当有系统事件触发、手势被识别为系统手势、某个事件出现取消了触摸等情况时，会触发 touchcancel

- 触发start 迅速 end 则为 tap 事件
- 触发start 持续 0.5s 则为 pressstart 事件
    - press 事件停止，转变为 pressend 事件
    - pressstart 后移动 达到10px 可为 panstart 事件
    - panstart 事件持续移动 则为 panmove 事件
    - panmove 事件停止，触发panend
- 触发start 并移动 则为 panstart 事件
    - panstart 事件持续移动 则为 panmove 事件
    - panmove 事件停止，触发panend