#!/usr/bin/env bash

rm -rf dist
mkdir dist
cp ./*.hbs dist/
cp -R partials dist/
cp -R assets dist/
