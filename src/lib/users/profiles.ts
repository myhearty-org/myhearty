import { Profile } from '@lib/types';
import { axiosWithAuth } from '@utils/myhearty-axios';

export function getUserProfile() {
  return axiosWithAuth.get('/user/profile');
}

export function updateUserProfile(profile: Profile) {
  return axiosWithAuth.patch('/user/profile', {
    ...profile,
  });
}
