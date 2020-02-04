"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var jokesSchema = new mongoose_1.default.Schema({
    overskrift: {
        type: String,
        required: true
    },
    jokeTekst: {
        type: String,
        required: true
    },
    dato: {
        type: Date,
        required: true,
        default: Date.now
    }
});
exports.default = mongoose_1.default.model("Jokes", jokesSchema);
