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
import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';

import { MGDL_UNITS, MMOLL_UNITS } from '../../../utils/constants';
import NonTandem from '../NonTandem';
import Tandem from '../Tandem';

export class PumpSettingsContainer extends PureComponent {
  static propTypes = {
    bgUnits: PropTypes.oneOf([MGDL_UNITS, MMOLL_UNITS]).isRequired,
    copySettingsClicked: PropTypes.func.isRequired,
    manufacturerKey: PropTypes.oneOf(
      ['animas', 'carelink', 'insulet', 'medtronic', 'tandem']
    ).isRequired,
    markSettingsViewed: PropTypes.func.isRequired,
    // see more specific schema in NonTandem and Tandem components!
    pumpSettings: PropTypes.shape({
      activeSchedule: PropTypes.string.isRequired,
    }).isRequired,
    timePrefs: PropTypes.shape({
      timezoneAware: PropTypes.bool.isRequired,
      timezoneName: PropTypes.string.isRequired,
    }).isRequired,
    settingsState: PropTypes.object.isRequired,
    toggleSettingsSection: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { markSettingsViewed } = this.props;
    const {
      manufacturerKey,
      pumpSettings: { activeSchedule, lastManualBasalSchedule },
      toggleSettingsSection,
      settingsState: { touched },
    } = this.props;

    if (!touched) {
      markSettingsViewed();
      toggleSettingsSection(manufacturerKey, lastManualBasalSchedule || activeSchedule);
    }
  }

  render() {
    const { settingsState, user } = this.props;
    if (_.isEmpty(settingsState)) {
      return null;
    }
    const {
      bgUnits,
      copySettingsClicked,
      manufacturerKey,
      pumpSettings,
      timePrefs,
      toggleSettingsSection,
    } = this.props;
    const supportedNonTandemPumps = ['animas', 'carelink', 'insulet', 'medtronic'];
    const toggleFn = _.partial(toggleSettingsSection, manufacturerKey);

    if (manufacturerKey === 'tandem') {
      return (
        <Tandem
          bgUnits={bgUnits}
          copySettingsClicked={copySettingsClicked}
          deviceKey={manufacturerKey}
          openedSections={settingsState[manufacturerKey]}
          pumpSettings={pumpSettings}
          timePrefs={timePrefs}
          toggleProfileExpansion={toggleFn}
          user={user}
        />
      );
    } else if (_.includes(supportedNonTandemPumps, manufacturerKey)) {
      return (
        <NonTandem
          bgUnits={bgUnits}
          copySettingsClicked={copySettingsClicked}
          deviceKey={manufacturerKey}
          openedSections={settingsState[manufacturerKey]}
          pumpSettings={pumpSettings}
          timePrefs={timePrefs}
          toggleBasalScheduleExpansion={toggleFn}
          user={user}
        />
      );
    }
    // eslint-disable-next-line no-console
    console.warn(`Unknown manufacturer key: [${manufacturerKey}]!`);
    return null;
  }
}

export function mapStateToProps(state, ownProps) {
  const userId = _.get(ownProps, 'currentPatientInViewId');
  const user = _.get(
    state.blip.allUsersMap,
    userId,
    {},
  );
  return {
    user,
  };
}

export default connect(
  mapStateToProps,
)(PumpSettingsContainer);
