import React from 'react'
import ReactDOMServer from 'react-dom/server'
import PropTypes from 'prop-types'
import {get, tail, take, find, filter, sum} from 'lodash'
import className from 'classnames'
import axios from 'axios'
import {format} from 'd3-format'

import epl_fixture_20202021 from '@csvs/epl_fixture_20202021.csv'
import epl_fixture_records from '@csvs/epl_fixture_records.csv'

const Index = (props) => {
  const team = 'Newcastle Utd'
  const fixtures = filter(epl_fixture_20202021, (x) => {
    return get(x, 'away_team') == team || get(x, 'home_team') == team
  })

  const fixturesRecords = filter(epl_fixture_records, (x) => {
    return get(x, 'away_team') == team || get(x, 'home_team') == team
  })

  const f = format('.3f')

  return (
    <div className='Index'>
      <div className='container'>
        <div className='Index__games'>
          {fixtures.map((x, i) => {
            const [opponent, isAway] =
              get(x, 'home_team') == team
                ? [get(x, 'away_team'), false]
                : [get(x, 'home_team'), true]

            const opponentGames = filter(fixturesRecords, (y) =>
              isAway
                ? get(y, 'home_team') == opponent
                : get(y, 'away_team') == opponent
            )

            const points = opponentGames.map((y, j) => {
              let score = 0

              if (
                get(y, 'home_team') == team &&
                get(y, 'score_home') > get(y, 'score_away')
              ) {
                score = 3
              } else if (
                get(y, 'away_team') == team &&
                get(y, 'score_home') < get(y, 'score_away')
              ) {
                score = 3
              } else if (get(y, 'score_home') == get(y, 'score_away')) {
                score = 1
              }

              return score
            })

            return (
              <div className='Index__game' key={i}>
                <h2 className='Index__game__h2'>
                  {get(x, 'game_date')}: {get(x, 'home_team')} vs{' '}
                  {get(x, 'away_team')}
                </h2>

                <p>
                  {get(opponentGames, 'length')} games,{' '}
                  {f(sum(points) / get(opponentGames, 'length'))} points
                </p>

                {true && (
                  <React.Fragment>
                    <dl className='Index__game__dl'>
                      {opponentGames.map((y, j) => {
                        let score = 0

                        if (
                          get(y, 'home_team') == team &&
                          get(y, 'score_home') > get(y, 'score_away')
                        ) {
                          score = 3
                        } else if (
                          get(y, 'away_team') == team &&
                          get(y, 'score_home') < get(y, 'score_away')
                        ) {
                          score = 3
                        } else if (
                          get(y, 'score_home') == get(y, 'score_away')
                        ) {
                          score = 1
                        }

                        return (
                          <div className='Index__game__dl__item' key={j}>
                            {get(y, 'home_team')} {get(y, 'score_home')} -{' '}
                            {get(y, 'score_away')} {get(y, 'away_team')} ={' '}
                            {score}
                          </div>
                        )
                      })}
                    </dl>
                  </React.Fragment>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

Index.propTypes = {}

export default Index
