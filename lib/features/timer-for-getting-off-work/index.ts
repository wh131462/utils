/**
 * 倒计时下班计时器
 * start 开始计时 - 可以指定下班时间
 * stop 终止计时
 *
 * @example
 * TimerForGettingOffWork.start("19:00");
 * TimerForGettingOffWork.stop();
 */
const hour = 60 * 60 * 1000;
const minute = 60 * 1000;
export const TimerForGettingOffWork = {
      timer: null,
      start: function (time  = "18:00") {
        console.log("开启下班倒计时~(停止指令:stop)")
        this.timer = setInterval(() => {
          const times = time.split(":").map(Number);
          const target = new Date();
          target.setHours(times[0], times[1], 0, 0);
          const diff = target.valueOf() - Date.now();
          const h = Math.abs(Math.floor(diff / hour)).toString().padStart(2,'0');
          const m = Math.abs(Math.floor(diff % hour / minute)).toString().padStart(2,'0');
          const s = Math.abs(Math.floor(diff % minute / 1000)).toString().padStart(2,'0');
          console.log(`${diff > 0 ? '距离下班还有' : '已经下班'}: ${h}:${m}:${s}!`)
        }, 1000);
      },
      stop: function () {
        console.log("停止下班倒计时~")
        clearInterval(this.timer)
      }
    };
