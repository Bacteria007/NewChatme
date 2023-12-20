import { PermissionsAndroid, Platform } from 'react-native';
import {
  check,
  PERMISSIONS,
  request,
} from 'react-native-permissions';

// it yh nichy wala dono permissions akhati ley rha baui agr ik b na li tu yh dosry  ko b access nai dey ga 

export const requestCameraAndGalleryPermission = async () => {
  const grantedCamera = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
  const grantedStorage = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
  if (
    grantedCamera === PermissionsAndroid.RESULTS.GRANTED &&
    grantedStorage === PermissionsAndroid.RESULTS.GRANTED
  ) {
    console.log('Camera and storage permission granted');
    return true;
  } else {
    console.log('Camera and storage permission denied');
    return false;
  }
}

export const requestCameraPermission = async () => {
  const grantedCamera = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
  if (
    grantedCamera === PermissionsAndroid.RESULTS.GRANTED
  ) {
    console.log('Camera permission granted');
    return true;
  } else {
    console.log('Camera permission denied');
    return false;
  }
}
export const requestGalleryPermission = async () => {
  const grantedStorage = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
  if (
    grantedStorage === PermissionsAndroid.RESULTS.GRANTED
  ) {
    console.log('storage permission granted');
    return true;
  } else {
    console.log('storage permission denied');
    return false;
  }
}


export const requestNotificationPermission = async () => {
  const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  return result;
};

export const checkNotificationPermission = async () => {
  const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  return result;
};