"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Button, Close } from "@honor-ui/inctagram-ui-kit";
import { useUserListModals } from "../../model/useUserListModals";

import s from "./user-list-modals.module.scss";

type Props = {
  open: boolean;
};
export const DeleteUserModal = ({ open }: Props) => {
  const { cancel, confirmDeleteUser: confirm, user } = useUserListModals();

  return (
    <Dialog.Root open={open} onOpenChange={cancel}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content className={s.content}>
          <Dialog.Title className={s.title}>
            <span>Delete user</span>
            <Button onClick={cancel} className={s.headerCancelBtn}>
              <Close />
            </Button>
          </Dialog.Title>
          <div className={s.body}>
            <Dialog.Description className={s.description}>
              Are you sure to delete user <b>{user?.userName} ?</b>
            </Dialog.Description>
            <div className={s.actionsBtnGroup}>
              <Button onClick={cancel}>Cancel</Button>
              <Button onClick={() => confirm()} variant={"outlined"}>
                Delete
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
