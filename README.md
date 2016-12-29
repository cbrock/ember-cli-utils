# ember-cli-utils

[![Build Status](https://travis-ci.org/cbrock/ember-cli-utils.svg?branch=master)](https://travis-ci.org/cbrock/ember-cli-utils)

A small set of utilities to help make working with ember-cli a little easier

## Installation
* `git clone` this repository and `cd` into the cloned directory
* `npm install` to install npm dependencies
* Run `npm link` to symlink as a global module
* You can run `npm ls -g --depth=0` to verify that the module is listed

## Usage
* `ember-cli -g X.X.X` where `X.X.X` is a valid ember-cli version you'd like to update to, globally. This is the equivalent of doing the following steps in succession:
 * `npm cache clean`
 * `bower cache clean`
 * `npm uninstall -g ember-cli`
 * `npm install -g ember-cli@X.X.X`
