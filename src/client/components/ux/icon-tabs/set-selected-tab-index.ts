import { iconTabsState } from '@client/components/ux/icon-tabs/state';

export function setSelectedTabIndex(index: number) {
    iconTabsState.selectedTabIndex = index;
}
