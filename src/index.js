class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.selector = selector;
        this.date = targetDate;
        this.intervalId = null;
        this.start();
    }
    start() {
        this.intervalId = setInterval(() => {
            const time = this.date.getTime() - Date.now()
            this.render(this.getTime(time));
        }, 1000);

        }
    
    stop() {
        clearInterval(this.intervalId);
    }

 getTime(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const secs = Math.floor((time % (1000 * 60)) / 1000).toString().padStart(2, '0');

    return { days, hours, mins, secs };
    }
    
    render({ days, hours, mins, secs }) {
        if (secs < 0) {
            this.stop();
            return false;
        }
        // document.querySelector(this.selector).innerHTML = `${days}:${hours}:${mins}:${secs}`;
        document.querySelector('[data-value="days"]').textContent = days;
        document.querySelector('[data-value="hours"]').textContent = hours;
        document.querySelector('[data-value="mins"]').textContent = mins;
        document.querySelector('[data-value="secs"]').textContent = secs;
    }    
}
new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 31, 2021'),
});