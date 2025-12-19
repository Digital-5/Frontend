import * as Application from 'expo-application';

export function getAppStats() {
    const appName = Application.applicationName;
    const appVersion = Application.nativeApplicationVersion;
    const appBuildNumber =  Application.nativeBuildVersion;
    const appId = Application.applicationId;
    return {
        appName,
        appVersion,
        appBuildNumber,
        appId
    };
}