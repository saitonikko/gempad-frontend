export const convertTime = (_time) => {
    const _second = _time % 60;
    const _minute = (_time / 60) % 60;
    const _hour = (_time / 3600) % 60;
    const _day = (_time / 86400) % 24;
    return `${parseInt(_day)} : ${parseInt(_hour)} : ${parseInt(_minute)} : ${parseInt(_second)}`;
}

export const isNumber = (num) => {
    return !isNaN(num);
}