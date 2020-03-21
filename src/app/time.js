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

export function drawTimezones(now) {
  const ms = Date.now();
  const tz1_now = new Date(ms + 10800000);
  const tz2_now = new Date(ms - 25200000);
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
