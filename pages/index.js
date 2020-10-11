import React from 'react'
import ReactDOMServer from 'react-dom/server'
import PropTypes from 'prop-types'
import {get, tail, take, find, filter, sum} from 'lodash'
import className from 'classnames'
import axios from 'axios'
import {format} from 'd3-format'
import {min, max} from 'd3-array'
import {scaleTime, scaleLinear} from 'd3-scale'
import {axisLeft} from 'd3-axis'
import {select} from 'd3-selection'
import moment from 'moment'

import epl_fixture_20202021 from '@csvs/epl_fixture_20202021.csv'
import epl_fixture_records from '@csvs/epl_fixture_records.csv'

class Index extends React.Component {
  static propTypes = {}

  static defaultProps = {}

  state = {
    __width: 0,
  }

  componentDidMount = () => {
    const f = format('.3f')

    const team = 'Newcastle Utd'

    const fixturesRecords = filter(epl_fixture_records, (x) => {
      return get(x, 'away_team') == team || get(x, 'home_team') == team
    })

    const fixtures = filter(epl_fixture_20202021, (x) => {
      return get(x, 'away_team') == team || get(x, 'home_team') == team
    }).map((x) => {
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

      return {
        ...x,
        _opponent: opponent,
        _isAway: isAway,
        _opponentGames: opponentGames,
        _points: points,
        _pointsAvg: f(sum(points) / get(opponentGames, 'length')),
      }
    })

    console.log(fixtures)

    this.setState({
      __width:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
      __height: 400,
      team,
      fixtures,
    })
  }

  render = () => {
    if (!get(this.state, 'fixtures.length')) {
      return null
    }

    const data = get(this.state, 'fixtures')

    const _margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 65,
    }

    const width = get(this.state, '__width') - _margin.left - _margin.right
    const height = get(this.state, '__height') - _margin.top - _margin.bottom

    const actualMaxY = max(
      get(this.state, 'fixtures').map((x) => get(x, '_pointsAvg'))
    )
    const actualMinY = min(
      get(this.state, 'fixtures').map((x) => get(x, '_pointsAvg'))
    )
    const dataLength = get(get(this.state, 'fixtures'), 'length', 0)

    let lowerBound = 0
    let upperBound = 3
    const xLinesCount = 4

    if (upperBound - lowerBound < xLinesCount) {
      upperBound = lowerBound + (xLinesCount - 1)
    }

    const x = scaleTime()
      .domain([0, dataLength - 1])
      .rangeRound([0, width])

    const y = scaleLinear()
      .domain([lowerBound, upperBound])
      .rangeRound([height, 0])
      .clamp(true)

    return (
      <div className='Index'>
        <div className='container'>
          <svg
            className='Index__svg'
            viewBox={`0 0 ${get(this.state, '__width')} ${get(
              this.state,
              '__height'
            )}`}
          >
            <g
              transform={`translate(${_margin.left}, ${_margin.top})`}
              className='Graph__graph-area'
            >
              {(() => {
                const offsetLeft = -25

                return (
                  <React.Fragment>
                    <g className='Graph__axis-xs'>
                      {Array.from(Array(xLinesCount)).map((_, i) => {
                        const yBound = scaleLinear()
                          .domain([0, xLinesCount - 1])
                          .range([lowerBound, upperBound])

                        const yBounded = yBound(i)
                        const f = format('.5~s')

                        return (
                          <g key={i}>
                            <line
                              className={className('Graph__axis', {})}
                              x1={-10}
                              y1={y(yBounded)}
                              x2={width + 10}
                              y2={y(yBounded)}
                            />

                            <text
                              className='Graph__label'
                              x={offsetLeft}
                              y={y(yBounded)}
                            >
                              {f(yBounded)}
                            </text>
                          </g>
                        )
                      })}
                    </g>
                  </React.Fragment>
                )
              })()}

              <g className='Graph__data'>
                {data.map((d, i) => (
                  <g key={i} className='Graph__datum'>
                    <text
                      className={className('Graph__label-x', {})}
                      x={x(i)}
                      y={y(0) + 20}
                    >
                      {moment(get(d, 'game_date')).format('MM-DD')}
                    </text>

                    <circle
                      cx={x(i)}
                      cy={y(get(d, '_pointsAvg'))}
                      r={5}
                      className='Graph__circle'
                    />
                  </g>
                ))}
              </g>
            </g>
          </svg>

          <div className='Index__games'>
            {(get(this.state, 'fixtures') || []).map((x, i) => {
              return (
                <div className='Index__game' key={i}>
                  <h2 className='Index__game__h2'>
                    {get(x, 'game_date')}: {get(x, 'home_team')} vs{' '}
                    {get(x, 'away_team')}
                  </h2>

                  <p>
                    {get(get(x, 'opponentGames'), 'length')} games,{' '}
                    {get(x, '_pointsAvg')} points
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Index
