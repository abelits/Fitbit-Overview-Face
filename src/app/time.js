import document from "document";
import { preferences } from "user-settings";
import { me as device } from "device";
import * as monospace from "./monospace.js";

export let root = document.getElementById('root')
export let timeHourEl10 = getElement("time-hour10");
export let timeHourEl1 = getElement("time-hour1");
export let timeColonEl = getElement("time-colon");
export let timeMinuteEl10 = getElement("time-minute10");
export let timeMinuteEl1 = getElement("time-minute1");
export let timeSecEl10 = getElement("second10");
export let timeSecEl1 = getElement("second1");
export let timeAmPmEl = getElement("am-pm");

export let tz1_iconEl = getElement("tz1-icon");
export let tz1_timeHourEl10 = getElement("tz1-hour10");
export let tz1_timeHourEl1 = getElement("tz1-hour1");
export let tz1_timeMinuteEl10 = getElement("tz1-minute10");
export let tz1_timeMinuteEl1 = getElement("tz1-minute1");
export let tz1_timeColonEl = getElement("tz1-colon");

export let tz21_iconEl = getElement("tz21-icon");

export let tz2b_iconEl = getElement("tz2-icon");
export let tz2b_timeHourEl10 = getElement("tz2-hour10");
export let tz2b_timeHourEl1 = getElement("tz2-hour1");
export let tz2b_timeMinuteEl10 = getElement("tz2-minute10");
export let tz2b_timeMinuteEl1 = getElement("tz2-minute1");
export let tz2b_timeColonEl = getElement("tz2-colon");

export let tz2a_iconEl = getElement("tz2a-icon");
export let tz2a_timeHourEl10 = getElement("tz2a-hour10");
export let tz2a_timeHourEl1 = getElement("tz2a-hour1");
export let tz2a_timeMinuteEl10 = getElement("tz2a-minute10");
export let tz2a_timeMinuteEl1 = getElement("tz2a-minute1");
export let tz2a_timeColonEl =  getElement("tz2a-colon");

export let tz2_iconEl = tz2b_iconEl;
export let tz2_timeHourEl10 = tz2b_timeHourEl10;
export let tz2_timeHourEl1 = tz2b_timeHourEl1;
export let tz2_timeMinuteEl10 = tz2b_timeMinuteEl10;
export let tz2_timeMinuteEl1 = tz2b_timeMinuteEl1;
export let tz2_timeColonEl = tz2b_timeColonEl;

export let isAmPm = false;
export let showSeconds = true;
export let showLeadingZero = true;
export let timeFormat = 'auto'
export var flashDotsInterval = null;
export function setIsAmPm(val) { isAmPm = val}
export function setShowSeconds(val) { showSeconds = val }
export function setShowLeadingZero(val) { showLeadingZero = val }
export function setTimeFormat(val) { timeFormat = val }

timeColonEl.text = ":";
timeColonEl.style.display = 'inline';

export function setFlashDots(val) { 
  if(val)
  {
    clearInterval(flashDotsInterval);
    flashDotsInterval = setInterval(animateColon, 500);
  }
  else
  {
    clearInterval(flashDotsInterval);
  }
}

export function animateColon()
{
  if(timeColonEl.style.display == 'none')
  {
    timeColonEl.style.display = 'inline';
  }
  else
  {
    timeColonEl.style.display = 'none';  
  }    
}

export function getElement(type){
    return document.getElementById(device.screen.width + "-" + type)
}

//Time Draw - START
export function drawTime(now) {
  setHours(now);
  setMinutes(now);
  setSeconds(now);
}

export function setSeconds(now){
  var m, n;
  if (showSeconds)
  {
    timeSecEl10.style.display= 'inline';
    timeSecEl1.style.display= 'inline';
/*
    timeSecEl.text = monospace.monoDigits(zeroPad(now.getSeconds()));
*/
    m = now.getSeconds();
    n = parseInt(m / 10, 10);
    timeSecEl10.text = n;
    timeSecEl1.text = m - (n * 10);
  }
  else
  {
    timeSecEl10.style.display= 'none';
    timeSecEl1.style.display= 'none';
  }
}

export function setMinutes(now){
    var m, n;
/*
  timeMinuteEl.style.display= 'inline';
  timeMinuteEl.text = monospace.monoDigits(zeroPad(now.getMinutes()));
*/
    timeMinuteEl10.style.display= 'inline';
    timeMinuteEl1.style.display= 'inline';

    m = now.getMinutes();
    n = parseInt(m / 10, 10);
    timeMinuteEl10.text = n;
    timeMinuteEl1.text = m - (n * 10);
}

export function setHours(now) {
  var n;
  var hours = now.getHours();
  let clockFormat = timeFormat;
  if(timeFormat === "auto")
  {
    clockFormat = preferences.clockDisplay;
  }

  if (clockFormat === "12h") {
    // 12h format
    if (isAmPm) {
      if (hours < 12) {
        timeAmPmEl.text = " AM";
      } else {
        timeAmPmEl.text = " PM";
      }
      timeAmPmEl.style.display= 'inline';
    }
    else
    {
      timeAmPmEl.style.display= 'none';
    }

    if (hours === 0)
    {
      hours = 12;
    } else if (hours > 12) {
      hours = hours - 12;
    }
  } else {
    // 24h format
    timeAmPmEl.style.display= 'none';
  }

/*
  timeHourEl.style.display= 'inline';
*/
  timeHourEl10.style.display= 'inline';
  timeHourEl1.style.display= 'inline';

  n = parseInt(hours / 10, 10);
  if(showLeadingZero)
    {
	timeHourEl10.text = n;
	timeHourEl1.text = hours - (n * 10);
/*
    timeHourEl.text = monospace.monoDigits(zeroPad(hours));
*/
    }
  else
    {
	if (hours >= 10) {
	    timeHourEl10.text = n;
	} else {
	    timeHourEl10.text = '';
	}
	timeHourEl1.text = hours - (n * 10);
/*
    timeHourEl.text = monospace.monoDigits(spacePad(hours));
*/
    }
}
//Time Draw - END

function isLeapYear(year)
{
    const leapdate1 = new Date(Date.UTC(year, 1, 28, 0, 0, 0, 0));
    const leapdate2 = new Date(Date.UTC(year, 2, 1, 0, 0, 0, 0));
    if ((leapdate2.getTime() - leapdate1.getTime()) > (25 * 3600 * 1000))
		return 1;
    else
		return 0;
}

function DaysInMonth(month, addfeb)
{
    switch (month) {
    case 1:
	return 28 + addfeb;
    case 3:
    case 5:
    case 8:
    case 10:
	return 30;
    default:
	return 31;
    }
}

var nextswitchtime = 0;
var nextswitchtime_set = 0;
var tz1_offset = 0;
var tz2_offset = 0;

function getoffset_m(now, regoffset, dstoffset,
		     regmonth, regweek, regday,
		     reghour, regminute, regsecond,
		     dstmonth, dstweek, dstday,
		     dsthour, dstminute, dstsecond) {

    const curr_reg = new Date(now + regoffset * 1000);
    const curr_dst = new Date(now + dstoffset * 1000);

    var year, leap, dow, first_matching_dow, day, days;

    var firstdaymon_dst, firstdaymon_reg,
	dstswitchtime, regswitchtime,
	dstswitchtime_utc, regswitchtime_utc;

    year = curr_reg.getUTCFullYear() + 1;

    do {
	leap = isLeapYear(year);
	days = DaysInMonth(dstmonth - 1);

	firstdaymon_dst = new Date(Date.UTC(year, dstmonth - 1, 1, 0, 0, 0, 0));

	dow = firstdaymon_dst.getUTCDay();
	first_matching_dow = 1 + (dstday - dow);
	if (first_matching_dow < 1)
	    first_matching_dow += 7;

	day = first_matching_dow + (dstweek - 1) * 7;

	while (day > days)
	    day -= 7;

	dstswitchtime = Date.UTC(year, dstmonth - 1, day, 0, 0, 0, 0)
	    + (dsthour * 3600 + dstminute * 60 + dstsecond) * 1000;
	dstswitchtime_utc = dstswitchtime - (regoffset * 1000);

	if ((dstswitchtime_utc > now) &&
	    ((nextswitchtime_set == 0)
	     || (nextswitchtime > dstswitchtime_utc))) {
	    nextswitchtime = dstswitchtime_utc;
	    nextswitchtime_set = 1;
	}
	year --;
    } while (dstswitchtime_utc > now);

    year = curr_dst.getUTCFullYear() + 1;

    do {
	leap = isLeapYear(year);
	days = DaysInMonth(regmonth - 1);

	firstdaymon_reg = new Date(Date.UTC(year, regmonth - 1, 1, 0, 0, 0, 0));
	dow = firstdaymon_reg.getUTCDay();
	first_matching_dow = 1 + (regday - dow);
	if (first_matching_dow < 1)
	    first_matching_dow += 7;

	day = first_matching_dow + (regweek - 1) * 7;

	while (day > days)
	    day -= 7;

	regswitchtime = Date.UTC(year, regmonth - 1, day, 0, 0, 0, 0)
	    + (reghour * 3600 + regminute * 60 + regsecond) * 1000;
	regswitchtime_utc = regswitchtime - (dstoffset * 1000);

	if ((regswitchtime_utc > now) &&
	    ((nextswitchtime_set == 0)
	     || (nextswitchtime > regswitchtime_utc))) {
	    nextswitchtime = regswitchtime_utc;
	    nextswitchtime_set = 1;
	}
	year --;
    } while (regswitchtime_utc > now);

    if (regswitchtime_utc >= dstswitchtime_utc)
    	return regoffset;
    else
    	return dstoffset;
}

export function drawTimezones(now) {
  const ms = Date.now();
  if (ms >= nextswitchtime || nextswitchtime_set == 0) {
      tz1_offset = 3 * 3600 * 1000; /* MSK-3 */
      tz2_offset = getoffset_m(ms,
		     -8 * 3600 * 1000, -7 * 3600 * 1000,
		     11, 1, 0,
		     2, 0, 0,
		     3, 2, 0,
		     2, 0, 0); /* PST8PDT,M3.2.0/2:00:00,M11.1.0/2:00:00 */
    }
  const tz1_now = new Date(ms + tz1_offset);
  const tz2_now = new Date(ms + tz2_offset);
  if (showSeconds) {
    tz2_timeColonEl = tz2b_timeColonEl;
    tz2_iconEl = tz2b_iconEl;
    tz2_timeHourEl10 = tz2b_timeHourEl10;
    tz2_timeHourEl1 = tz2b_timeHourEl1;
    tz2_timeMinuteEl10 = tz2b_timeMinuteEl10;
    tz2_timeMinuteEl1 = tz2b_timeMinuteEl1;
    tz2a_timeColonEl.style.display = 'none';
    tz2a_iconEl.style.display = 'none';
    tz2a_timeHourEl10.style.display = 'none';
    tz2a_timeHourEl1.style.display = 'none';
    tz2a_timeMinuteEl10.style.display = 'none';
    tz2a_timeMinuteEl1.style.display = 'none';
  } else {
    tz2_timeColonEl = tz2a_timeColonEl;
    tz2_iconEl = tz2a_iconEl;
    tz2_timeHourEl10 = tz2a_timeHourEl10;
    tz2_timeHourEl1 = tz2a_timeHourEl1;
    tz2_timeMinuteEl10 = tz2a_timeMinuteEl10;
    tz2_timeMinuteEl1 = tz2a_timeMinuteEl1;
    tz2b_timeColonEl.style.display = 'none';
    tz2b_iconEl.style.display = 'none';
    tz2b_timeHourEl10.style.display = 'none';
    tz2b_timeHourEl1.style.display = 'none';
    tz2b_timeMinuteEl10.style.display = 'none';
    tz2b_timeMinuteEl1.style.display = 'none';
  }

  if ((now.getHours() != tz1_now.getUTCHours())
      || (now.getMinutes() != tz1_now.getUTCMinutes())) {
    set_tz1_Hours(tz1_now);
    set_tz1_Minutes(tz1_now);
    tz1_timeColonEl.text = ":";
    tz1_timeColonEl.style.display = 'inline';
    tz1_iconEl.style.display = 'inline';
    tz21_iconEl.style.display = 'none';
    tz1_timeMinuteEl10.style.display= 'inline';
    tz1_timeMinuteEl1.style.display= 'inline';
    tz1_timeHourEl10.style.display= 'inline';
    tz1_timeHourEl1.style.display= 'inline';
    if ((now.getHours() != tz2_now.getUTCHours())
        || (now.getMinutes() != tz2_now.getUTCMinutes())) {
      set_tz2_Hours(tz2_now);
      set_tz2_Minutes(tz2_now);
      tz2_timeColonEl.text = ":";
      tz2_timeColonEl.style.display = 'inline';
      tz2_iconEl.style.display = 'inline';
      tz2_timeMinuteEl10.style.display= 'inline';
      tz2_timeMinuteEl1.style.display= 'inline';
      tz2_timeHourEl10.style.display= 'inline';
      tz2_timeHourEl1.style.display= 'inline';
    } else {
      tz2_timeColonEl.text = ":";
      tz2_timeColonEl.style.display = 'none';
      tz2_iconEl.style.display = 'none';
      tz2_timeMinuteEl10.style.display= 'none';
      tz2_timeMinuteEl1.style.display= 'none';
      tz2_timeHourEl10.style.display= 'none';
      tz2_timeHourEl1.style.display= 'none';
    }
  } else {
    tz2_timeColonEl.text = ":";
    tz2_timeColonEl.style.display = 'none';
    tz2_iconEl.style.display = 'none';
    tz2_timeMinuteEl10.style.display= 'none';
    tz2_timeMinuteEl1.style.display= 'none';
    tz2_timeHourEl10.style.display= 'none';
    tz2_timeHourEl1.style.display= 'none';
    if ((now.getHours() != tz2_now.getUTCHours())
        || (now.getMinutes() != tz2_now.getUTCMinutes())) {
      set_tz1_Hours(tz2_now);
      set_tz1_Minutes(tz2_now);
      tz1_timeColonEl.text = ":";
      tz1_timeColonEl.style.display = 'inline';
      tz1_iconEl.style.display = 'none';
      tz21_iconEl.style.display = 'inline';
      tz1_timeMinuteEl10.style.display= 'inline';
      tz1_timeMinuteEl1.style.display= 'inline';
      tz1_timeHourEl10.style.display= 'inline';
      tz1_timeHourEl1.style.display= 'inline';
    } else {
      tz1_timeColonEl.text = ":";
      tz1_timeColonEl.style.display = 'none';
      tz1_iconEl.style.display = 'none';
      tz21_iconEl.style.display = 'none';
      tz1_timeMinuteEl10.style.display= 'none';
      tz1_timeMinuteEl1.style.display= 'none';
      tz1_timeHourEl10.style.display= 'none';
      tz1_timeHourEl1.style.display= 'none';
    }
  }
}

export function set_tz1_Minutes(now){
    var m, n;


    m = now.getUTCMinutes();
    n = parseInt(m / 10, 10);
    tz1_timeMinuteEl10.text = n;
    tz1_timeMinuteEl1.text = m - (n * 10);
}

export function set_tz1_Hours(now) {
  var n;
  var hours = now.getUTCHours();

  n = parseInt(hours / 10, 10);
  if(showLeadingZero)
    {
	tz1_timeHourEl10.text = n;
	tz1_timeHourEl1.text = hours - (n * 10);
    }
  else
    {
	if (hours >= 10) {
	    tz1_timeHourEl10.text = n;
	} else {
	    tz1_timeHourEl10.text = '';
	}
	tz1_timeHourEl1.text = hours - (n * 10);
    }
}

export function set_tz2_Minutes(now){
    var m, n;

    tz2_timeMinuteEl10.style.display= 'inline';
    tz2_timeMinuteEl1.style.display= 'inline';

    m = now.getUTCMinutes();
    n = parseInt(m / 10, 10);
    tz2_timeMinuteEl10.text = n;
    tz2_timeMinuteEl1.text = m - (n * 10);
}

export function set_tz2_Hours(now) {
  var n;
  var hours = now.getUTCHours();
  tz2_timeHourEl10.style.display= 'inline';
  tz2_timeHourEl1.style.display= 'inline';

  n = parseInt(hours / 10, 10);
  if(showLeadingZero)
    {
	tz2_timeHourEl10.text = n;
	tz2_timeHourEl1.text = hours - (n * 10);
    }
  else
    {
	if (hours >= 10) {
	    tz2_timeHourEl10.text = n;
	} else {
	    tz2_timeHourEl10.text = '';
	}
	tz2_timeHourEl1.text = hours - (n * 10);
    }
}

export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export function spacePad(i) {
  if (i < 10) {
    i = " " + i;
  }
  return i;
}
