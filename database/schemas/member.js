const mongoose = require("mongoose");

const config = require("../../globalconfig.json");

const Schema = new mongoose.Schema({
	// User Information //
	id: { type: String },
	guildID: { type: String },

	// Information //
	bio: { type: String },
	birthday: { type: Number },

	// Stats //
	registrationDate: { type: Number, default: Date.now() },

	// Data //
	xp: { type: Number, default: 0 },
	level: { type: Number, default: 0 },

	infractions: { type: Array, default: [] },
	infractionsCount: { type: Number, default: 0 },
	mute: {
		type: Object,
		default: { muted: false, case: null, endDate: null },
	}
});

Schema.pre("findOneAndUpdate", function() {
	const update = this.getUpdate();
	if (update.__v !== null) {
		delete update.__v;
	}
	const keys = ["$set", "$setOnInsert"];
	for (const key of keys) {
		if (update[key] !== null && update[key].__v !== null) {
			delete update[key].__v;
			if (Object.keys(update[key]).length === 0) {
				delete update[key];
			}
		}
	}
	update.$inc = update.$inc || {};
	update.$inc.__v = 1;
});

module.exports = mongoose.model("Member", Schema);
