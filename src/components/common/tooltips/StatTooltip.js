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

import React, { PropTypes, PureComponent } from 'react';
import _ from 'lodash';
import Tooltip from '../../common/tooltips/Tooltip';
import colors from '../../../styles/colors.css';
import styles from './StatTooltip.css';

class StatTooltip extends PureComponent {
  renderMessages() {
    const messages = this.props.messages;
    const rows = [];

    _.each(messages, (message, index) => {
      rows.push(
        <div
          key={`message-${index}`}
          className={styles.message}
        >
          {message}
        </div>
      );
      if (index !== messages.length - 1) {
        rows.push(
          <div
            key={`divider-${index}`}
            className={styles.divider}
          />
        );
      }
    });

    return <div className={styles.container}>{rows}</div>;
  }

  render() {
    return (
      <Tooltip
        {...this.props}
        content={this.renderMessages()}
      />
    );
  }
}

StatTooltip.propTypes = {
  position: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }).isRequired,
  offset: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number,
    horizontal: PropTypes.number,
  }),
  titls: PropTypes.node,
  tail: PropTypes.bool.isRequired,
  side: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
  tailColor: PropTypes.string.isRequired,
  tailWidth: PropTypes.number.isRequired,
  tailHeight: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string.isRequired,
  borderWidth: PropTypes.number.isRequired,
};

StatTooltip.defaultProps = {
  tail: true,
  side: 'right',
  tailWidth: 9,
  tailHeight: 17,
  tailColor: colors.statDefault,
  borderColor: colors.statDefault,
  borderWidth: 2,
};

export default StatTooltip;
