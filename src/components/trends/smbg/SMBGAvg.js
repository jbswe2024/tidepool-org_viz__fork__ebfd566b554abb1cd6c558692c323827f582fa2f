/*
 * == BSD2 LICENSE ==
 * Copyright (c) 2016, Tidepool Project
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the associated License, which is identical to the BSD 2-Clause
 * License as published by the Open Source Initiative at opensource.org.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the License for more details.
 *
 * You should have received a copy of the License along with this program; if
 * not, you can obtain one from Tidepool Project at tidepool.org.
 * == BSD2 LICENSE ==
 */

import React, { PropTypes } from 'react';

import styles from './SMBGAvg.css';

const SMBGAvg = (props) => {
  const { datum } = props;
  if (!datum) {
    return null;
  }

  const { focusRange, meanRadius, unfocusRange, xScale, yPositions } = props;
  const xPos = xScale(datum.msX);
  const unfocus = unfocusRange.bind(null);
  const focus = () => {
    focusRange(datum, {
      left: xPos,
      tooltipLeft: datum.msX > props.tooltipLeftThreshold,
      yPositions,
    });
  };

  return (
    <g id={`smbgAvgGroup-${datum.id}`}>
      <circle
        className={styles.smbgMean}
        id={`smbgMean-${datum.id}`}
        onMouseOver={focus}
        onMouseOut={unfocus}
        cx={xPos}
        cy={yPositions.mean}
        r={meanRadius}
      />
    </g>
  );
};

SMBGAvg.defaultProps = {
  meanRadius: 7,
  rectWidth: 18,
};

SMBGAvg.propTypes = {
  // if there's a gap in data, a `datum` may not exist, so not required
  datum: PropTypes.shape({
    id: PropTypes.string.isRequired,
    max: PropTypes.number.isRequired,
    mean: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    msX: PropTypes.number.isRequired,
  }),
  focusRange: PropTypes.func.isRequired,
  meanRadius: PropTypes.number.isRequired,
  rectWidth: PropTypes.number.isRequired,
  tooltipLeftThreshold: PropTypes.number.isRequired,
  unfocusRange: PropTypes.func.isRequired,
  xScale: PropTypes.func.isRequired,
  yPositions: PropTypes.shape({
    min: PropTypes.number.isRequired,
    mean: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
};

export default SMBGAvg;
