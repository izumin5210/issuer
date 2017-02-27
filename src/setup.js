/* @flow */
import React from 'react'

global.React = React

if (process.env.NODE_ENV !== 'production') {
  require('regenerator-runtime/runtime')
  global.assert = require('power-assert') // eslint-disable-line
  global.Perf = require('react-addons-perf') // eslint-disable-line
}
