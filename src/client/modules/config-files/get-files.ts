import { configFilesState } from '@client/modules/config-files/state';

export function getFiles() {
    return configFilesState.files;
}
