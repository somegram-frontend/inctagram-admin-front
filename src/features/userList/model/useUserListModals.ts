'use client'

import { banUser, deleteUser, unbanUser } from '@/features/userList/api'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '@/app/store'
import {
  getOpenedModalUserList,
  getSelectedUserUserList,
} from '@/features/userList/model/user-list.selectors'
import {
  ModalType,
  userListActions,
} from '@/features/userList/model/user-list.slice'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/shared/api/instanse'
import { GetUsersQuery } from '@/shared/configs/gql/graphql'

const optionsReasons = [
  { value: 'Bad behavio', label: 'Bad behavior' },
  {
    value: 'Advertising placement',
    label: 'Advertising placement',
  },
  { value: 'Another reason', label: 'Another reason' },
]

export const useUserListModals = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(getSelectedUserUserList)
  const viewModal = useAppSelector(getOpenedModalUserList)

  const cancel = () => {
    dispatch(userListActions.closeModal())
  }

  const openModal = (
    user: { userName: string; userId: string },
    modal: ModalType
  ) => {
    dispatch(userListActions.openModal({ user, modal }))
  }

  const { mutate: confirmDeleteUser } = useMutation({
    mutationKey: ['users'],
    mutationFn: async () => await deleteUser({ userId: user?.userId || '' }),
    onSuccess: () => {
      toast.success('User deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: () => {
      toast.error('Error deleting user')
    },
    onSettled: () => {
      cancel()
    },
  })

  const { mutate: confirmBanUser } = useMutation({
    mutationKey: ['users'],
    mutationFn: async ({ banReason }: { banReason: string }) =>
      await banUser({
        banUserInput: { userId: user?.userId || '', banReason },
      }),
    onSuccess: () => {
      toast.success('User banned successfully')
    },
    onMutate: ({ banReason }) => {
      queryClient.setQueryData(
        ['users', user?.userId],
        (oldData: GetUsersQuery['getUsers']) => {
          if (!oldData) return oldData

          return {
            ...oldData,
            users: oldData.items.map((u) =>
              u.id === user?.userId
                ? {
                    ...u,
                    banInfo: {
                      banUser: true,
                      banReason,
                    },
                  }
                : u
            ),
          }
        }
      )
    },
    onError: () => {
      toast.error('Error banning user')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      cancel()
    },
  })

  const { mutate: confirmUnbanUser } = useMutation({
    mutationKey: ['users'],
    mutationFn: async () => await unbanUser({ userId: user?.userId || '' }),
    onSuccess: () => {
      toast.success('User unbanned successfully')
      queryClient.setQueryData(
        ['users', user?.userId],
        (oldData: GetUsersQuery['getUsers']) => {
          if (!oldData) return oldData

          return {
            ...oldData,
            users: oldData.items.map((u) =>
              u.id === user?.userId ? { ...u, banInfo: null } : u
            ),
          }
        }
      )
    },
    onError: () => {
      toast.error('Error unbanning user')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      cancel()
    },
  })

  return {
    viewModal,
    cancel,
    openModal,
    user,
    confirmBanUser,
    confirmDeleteUser,
    confirmUnbanUser,
    optionsReasons,
  }
}
