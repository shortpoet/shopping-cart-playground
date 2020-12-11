"use strict";
exports.__esModule = true;
exports.createPost = void 0;
var typeorm_1 = require("typeorm");
var Post_1 = require("../../src/entity/Post");
var moment_1 = require("moment");
exports.createPost = function (attrs, user) {
    var repo = typeorm_1.getRepository(Post_1.Post);
    return repo.save({
        title: attrs.title || 'My Cool Post',
        userId: user.id,
        created: moment_1["default"]()
    });
};
