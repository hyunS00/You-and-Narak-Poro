const throttleTimer = {
    timer: null,
};

module.exports = {
    timer: null,
    throttle() {
        console.log('timer: ', this.timer);
        // 1. timer 값이 undefined니까 if문 실행
        if (!this.timer) {
            // 2. timer 에 time함수 설정
            this.timer = setTimeout(function () {
                // 3. 설정시간에 맞춰 timer 초기화 및 함수 실행
                timer = null;
            }, 2000);
            return false;
        } else {
            return true;
        }
    },
};
