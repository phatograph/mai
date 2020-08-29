import React from 'react'
import ReactDOMServer from 'react-dom/server'
import PropTypes from 'prop-types'
import {get, tail, takeRight, find} from 'lodash'
import className from 'classnames'
import axios from 'axios'

const Index = (props) => {
  return (
    <div className='Index'>
      <h1 className='Index__h1'>
        Anangut<strong>MaiJa</strong>
      </h1>
    </div>
  )
}

Index.propTypes = {}

export default Index
