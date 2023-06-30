import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

export type BaseQueryOptions<T = unknown, E = Error, D = T> = Omit<UseQueryOptions<T, E, D>, 'queryKey' | 'queryFn'>;
export type QueryOptions<T = unknown, E = Error, D = T> = BaseQueryOptions<T, E, D>;
export type MutationOptions<T = any, E = Error, V = unknown> = Omit<UseMutationOptions<T, E, V>, 'mutationFn'>;
