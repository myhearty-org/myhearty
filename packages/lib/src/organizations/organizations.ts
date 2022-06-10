import { Organization } from '../types';
import { axiosWithAuth } from '@myhearty/utils/myhearty-axios';

export async function getAuthenticatedOrganization() {
  const { data } = await axiosWithAuth.get('/org');
  const organization: Organization = { ...data };

  return organization;
}
