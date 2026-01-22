import { findConfigFiles } from '@client/api/find-config-files';
import { configFilesState } from '@client/modules/config-files/state';

export const loadConfigFiles = async () => {
    configFilesState.isLoading = true;

    const configFiles = await findConfigFiles();

    if (configFiles.success && configFiles.data) {
        configFilesState.files = configFiles.data.files;
    }

    configFilesState.isLoading = false;
};
