'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useUserListModals } from '@/features/userList/model/useUserListModals'

import s from './user-list-modals.module.scss'
import { Button, Close } from '@honor-ui/inctagram-ui-kit'

type Props = {
  open: boolean
}

export const UnbanUserModal = (props: Props) => {
  const { open } = props

  const { cancel, user, confirmUnbanUser } = useUserListModals()

  return (
    <Dialog.Root open={open} onOpenChange={cancel}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content className={s.content}>
          <Dialog.Title className={s.title}>
            <span>Unban user</span>
            <Button onClick={cancel} className={s.headerCancelBtn}>
              <Close />
            </Button>
          </Dialog.Title>
          <div className={s.body}>
            <Dialog.Description className={s.description}>
              Are you sure to unban this user, {user?.userName}?
            </Dialog.Description>

            <div className={s.actionsBtnGroup}>
              <Button onClick={cancel} className={s.cancel}>
                No
              </Button>
              <Button onClick={() => confirmUnbanUser()} className={s.confirm}>
                Yes
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
