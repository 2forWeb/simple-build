import { findConfigFiles } from '@client/api/find-config-files';
import { configFilesState } from '@client/modules/config-files/state';

export const loadConfigFiles = async () => {
    const configFiles = await findConfigFiles();

    if (configFiles.success && configFiles.data) {
        configFilesState.files = configFiles.data.files;
    }
};
