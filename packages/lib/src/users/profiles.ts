import { UserProfile } from '../types';
import { axiosWithAuth } from '@myhearty/utils/myhearty-axios';

export async function getUserProfile() {
  const { data } = await axiosWithAuth.get('/user/profile');
  const userProfile: UserProfile = { ...data };

  return userProfile;
}

export async function updateUserProfile(userProfileData: UserProfile) {
  const { data } = await axiosWithAuth.patch('/user/profile', {
    ...userProfileData,
  });
  const userProfile: UserProfile = { ...data };

  return userProfile;
}
