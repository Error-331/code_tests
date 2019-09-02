'use strict';

// external imports

// local imports

// query wrappers implementation
const report1 = (dbConnection) => dbConnection.exec(
    `
SELECT modulesVersions.module_name_id, modulesNames.name, modulesVersions.version
    FROM modules_names AS modulesNames
    INNER JOIN modules_versions AS modulesVersions ON modulesVersions.module_name_id = modulesNames.id
ORDER BY modulesVersions.module_name_id
    `
);

const report2 = (dbConnection) => dbConnection.exec(
    `
    SELECT modulesVersions.module_name_id, modulesLocations.module_version_id, modulesNames.name, modulesNames.belongs_to_organization, modulesVersions.version, modulesLocations.path
    FROM modules_names AS modulesNames
    INNER JOIN modules_versions AS modulesVersions ON modulesVersions.module_name_id = modulesNames.id
    INNER JOIN modules_locations AS modulesLocations ON modulesLocations.module_name_id = modulesNames.id AND modulesLocations.module_version_id = modulesVersions.id
    ORDER BY modulesVersions.module_name_id
    `
);

// export