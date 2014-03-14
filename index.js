function nSet(o, key, value) {
	if (typeof o.set === 'function') {
		o.set(key, value);
	} else {
		o[key] = value;
	}
}

function nInc(value, amount) {
	if (typeof value.inc === 'function') {
		value.inc(amount);
	} else {
		value += amount;
	}
}

function get(o, path) {
	var key = path[0];

	if (!o.hasOwnProperty(key)) {
		return undefined;
	}

	if (path.length === 1) {
		return o[key];
	}

	return get(o[key], path.concat().splice(1, path.length - 1));
}

function inc(o, path, amount) {
	amount = amount || 1;

	var key = path[0];

	if (!o.hasOwnProperty(key)) {
		nSet(o, key, path.length === 1 ? 0 : {});
	}

	if (path.length > 1) {
		inc(o[key], path.concat().splice(1, path.length - 1), amount);
	} else {
		nInc(o[key], amount);
	}

	return o;
}

function set(o, path, value) {
	var key = path[0];

	if (!o.hasOwnProperty(key)) {
		nSet(o, key, path.length === 1 ? value : {});
	}

	if (path.length > 1) {
		set(o[key], path.concat().splice(1, path.length - 1), value);
	}

	return o;
}

exports.get = get;
exports.inc = inc;
exports.set = set;
