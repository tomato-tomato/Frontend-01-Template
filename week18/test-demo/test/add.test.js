import {add} from "../src/add.js";
let assert = require('assert');

it('should be equal',  () => {
    assert.equal(add(3, 5), 8);
});