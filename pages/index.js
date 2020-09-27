import React from 'react'
import ReactDOMServer from 'react-dom/server'
import PropTypes from 'prop-types'
import {get, tail, takeRight, find} from 'lodash'
import className from 'classnames'
import axios from 'axios'

import epl_fixture_20202021 from '@csvs/epl_fixture_20202021.csv'
// import epl_fixture_records from '@csvs/epl_fixture_records.csv'

const Index = (props) => {
  const fixtures = epl_fixture_20202021.filter((x) => {
    return (
      get(x, 'away_team') == 'Newcastle Utd' ||
      get(x, 'home_team') == 'Newcastle Utd'
    )
  })

  return (
    <div className='Index'>
      <div className='container'>
        {fixtures.map((x, i) => (
          <div className='Index__game' key={i}>
            <h2 className='Index__game__h2'>
              {get(x, 'game_date')}: {get(x, 'home_team')} vs{' '}
              {get(x, 'away_team')}
            </h2>
          </div>
        ))}
      </div>
    </div>
  )
}

Index.propTypes = {}

export default Index
