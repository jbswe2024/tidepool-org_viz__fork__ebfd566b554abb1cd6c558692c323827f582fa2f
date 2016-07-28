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

import _ from 'lodash';
import { range } from 'd3-array';
import React, { PropTypes } from 'react';

import * as datetime from '../../../utils/datetime';

import styles from './SolidBackground.css';

const SolidBackground = (props) => {
  const { data, margins, svgDimensions, xScale } = props;
  return (
    <g id="background">
      <rect
        className={styles.background}
        x={margins.left}
        y={margins.top}
        width={svgDimensions.width - margins.left - margins.right}
        height={svgDimensions.height - margins.top - margins.bottom}
      />
      {_.map(data, (val, i) => (
        <line
          className={styles.threeHrLine}
          key={`threeHrLine-${i}`}
          x1={xScale(val)}
          x2={xScale(val)}
          y1={margins.top}
          y2={svgDimensions.height - margins.bottom}
        />
      ))}
    </g>
  );
};

SolidBackground.defaultProps = {
  data: _.map(range(1, 8), (i) => (i * datetime.THREE_HRS)),
};

SolidBackground.propTypes = {
  data: PropTypes.array.isRequired,
  margins: PropTypes.object.isRequired,
  smbgOpts: PropTypes.object.isRequired,
  svgDimensions: PropTypes.object.isRequired,
  xScale: PropTypes.func.isRequired,
};

export default SolidBackground;
