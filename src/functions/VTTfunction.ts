var parser = (function () {
	var pItems = {
		fromVtt: undefined,
		toVtt: undefined,
	};

	// @ts-ignore
	pItems.fromVtt = function (data: any, timeFormat: any) {
		data = data.replace(/\r/g, '');
		var regex = /(\d+)?\n?(\d{2}:)?(\d{2}:\d{2}[,.]\d{3}) --> (\d{2}:)?(\d{2}:\d{2}[,.]\d{3}).*\n/g;
		data = data.split(regex);
		data.shift();
		var items = [];
		for (var i = 0; i < data.length; i += 6) {
			var text = data[i + 5];
			if (text.trim().length === 0) {continue;}
			items.push({
				id: data[i] ? +data[i].trim() : items.length + 1,
				startTime: changeTimeFormat(data[i + 2] ? data[i + 1] + data[i + 2].trim() : data[i + 2].trim(), timeFormat),
				endTime: changeTimeFormat(data[i + 4] ? data[i + 3] + data[i + 4].trim() : data[i + 4].trim(), timeFormat),
				text: text.trim(),
			});
		}
		return items;
	};

	// @ts-ignore
	pItems.toVtt = function (data) {
		if (!Array.isArray(data)) {return '';}
		var res = '';

		for (var i = 0; i < data.length; i++) {
			var s = data[i];

			if (!isNaN(s.startTime) && !isNaN(s.endTime)) {
				s.startTime = msTime(parseInt(s.startTime, 10));
				s.endTime = msTime(parseInt(s.endTime, 10));
			}

			res += s.id + '\r\n';
			res += s.startTime + ' --> ' + s.endTime + '\r\n';
			res += s.text.replace('\n', '\r\n') + '\r\n\r\n';
		}

		return res;
	};
	// @ts-ignore
	var changeTimeFormat = function (time, format) {
		if (format === 'ms') {
			return timeMs(time);
		} else if (format === 's') {
			return timeMs(time) / 1000;
		} else {
			return time;
		}
	};
	// @ts-ignore
	var timeMs = function (val) {
		var regex = /(\d{2}:)?(\d{2}:\d{2}[,.]\d{3})/;
		var parts = regex.exec(val);

		if (parts === null) {
			return 0;
		}

		var hours = parts[1] ? parseInt(parts[1].replace(':', ''), 10) : 0;
		var timeParts = parts[2].split(/[:,.]/);
		var minutes = parseInt(timeParts[0], 10);
		var seconds = parseInt(timeParts[1], 10);
		var ms = parseInt(timeParts[2], 10);

		return (hours * 3600000) + (minutes * 60000) + (seconds * 1000) + ms;
	};
	// @ts-ignore
	var msTime = function (val) {
		var measures = [3600000, 60000, 1000];
		var time = [];

		for (var i in measures) {
			var res = ((val / measures[i]) >> 0).toString();

			if (res.length < 2) {res = '0' + res;}
			val %= measures[i];
			time.push(res);
		}

		var ms = val.toString();
		if (ms.length < 3) {
			// @ts-ignore
			for (i = 0; i <= 3 - ms.length; i++) {ms = '0' + ms;}
		}

		return time.join(':') + ',' + ms;
	};

	return pItems;
})();

export default parser;
