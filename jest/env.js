/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

"use strict";
/* global jest */
jest.autoMockOff();

const fs = require("fs");
const jscodeshift = require("jscodeshift");
const p = require("path");

const read = fileName => fs.readFileSync(
    p.join(__dirname, global.baseDir, "test", fileName),
    "utf8"
);

global.test = (transformName, testFileName, options, fakeOptions) => {
    let path = testFileName + ".js";
    const source = read(testFileName + ".js");
    const output = read(testFileName + ".output.js");
    const transform = require(
        p.join(global.baseDir, "/transforms/", transformName)
    );

    const fullPath = p.join(__dirname, global.baseDir, "test", path, "../");

    if (fakeOptions) {
        if (fakeOptions.path) {
            path = fakeOptions.path;
        }
    }

    expect(
        (transform({path, fullPath, source}, {jscodeshift}, options || {}) || "").trim()
    ).toEqual(
        output.trim()
    );
};
