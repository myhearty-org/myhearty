import { Member } from '../types';
import { generatePaginationMetadata } from '@myhearty/utils/api';
import { axiosWithAuth } from '@myhearty/utils/myhearty-axios';

export async function getMembers(page?: number, perPage?: number) {
  const { data, headers } = await axiosWithAuth.get('/members', {
    params: {
      page,
      perPage,
    },
  });

  const members: Member[] = data;
  const paginationMetadata = generatePaginationMetadata(headers);

  return { members, paginationMetadata };
}

export async function createMember(email: string, password: string) {
  const { data } = await axiosWithAuth.post('/members', {
    member: {
      email,
      password,
    },
  });
  const member: Member = { ...data };

  return member;
}

export async function deleteMember(id: number) {
  return axiosWithAuth.delete(`/members/${id}`);
}
