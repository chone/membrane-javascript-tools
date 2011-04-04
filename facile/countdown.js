// namespace
var mem = mem || {};
/**
 * Class for a countdown counter
 * @param {Element} el 
 * @param {Date} datetime
 * @param {int} timezone, default 0
 *   exapmle: London 0(GMT 0), Paris 1 (GMT+1), 
 *            Beijing 8 (GMT+8), NewYork -5 (GMT-5)
 */
mem.Countdown = function(el, datetime, timezone) {
	this._el = el;
	this._datetime = datetime;
	this._timezone = timezone || 0;
	this.start();
};

/**
 * Display string template, can use html
 */
// en_eu/en_us
mem.Countdown.TEMPLATE = {
	TEXT: ['%day%Days', '%hours%Hours', '%minutes%Minutes', '%seconds%Seconds'],
	SEPARATOR: ' : '
};
// zh_cn
/*mem.Countdown.TEMPLATE = {
	TEXT: ['%day%天', '%hours%小时', '%minutes%分', '%seconds%秒'],
	SEPARATOR: ' : '
};*/
// fr_fr
/*mem.Countdown.TEMPLATE = {
	TEXT: ['%day%Jours', '%hours%Heures', '%minutes%Minutes', '%seconds%Secondes'],
	SEPARATOR: ' : '
};*/

/**
 * Start counter, if it's starting do nothing
 */
mem.Countdown.prototype.start = function() {
	if (!this._timer) {
		var self = this;
		this._timer = setInterval(function(){
			self._showTimeLeft()
		}, 1000);
	}
};

/**
 * Stop counter 
 */
mem.Countdown.prototype.stop = function() {
	clearInterval(this._timer);
};

/**
 * Create string for time left 
 * @return string
 */
mem.Countdown.prototype._createText = function(day, hours, minutes, seconds) {
	var text = [], tpl = mem.Countdown.TEMPLATE;
	if (day > 0) text.push(tpl.TEXT[0].replace(/%day%/, day));
  if (day > 0 || hours > 0) text.push(tpl.TEXT[1].replace(/%hours%/, hours));
  if (day > 0 || hours > 0 || minutes > 0 || seconds > 0) {
		text.push(tpl.TEXT[2].replace(/%minutes%/, minutes));
		text.push(tpl.TEXT[3].replace(/%seconds%/, seconds));
	}
	return text.join(tpl.SEPARATOR);
};

/**
 * Show time left 
 * @private
 */
mem.Countdown.prototype._showTimeLeft = function() {
	if (!this._el || !this._datetime) return;
	var ct = new Date();
  var csec = parseInt(ct.getTime()/1000) + 
	           ct.getTimezoneOffset() * 60 + this._timezone * 3600;
  var nsec = parseInt(this._datetime.getTime() / 1000);
  var osec = nsec - csec;
  var day = parseInt(osec/86400);
  var rest = osec % 86400;
  var hours = parseInt(rest/3600);
  rest = rest % 3600;
  var minutes = parseInt(rest/60);
  var seconds = rest % 60;

	var text = this._createText(day, hours, minutes, seconds);
  this._el.innerHTML = text;
  if (text === '') this.stop();
};


