import {createSelector} from 'reselect'

const selectAlert = (state :any) => state.alert

export const selectAlertInfo = createSelector(
    [selectAlert] ,
    alert => alert.info
)