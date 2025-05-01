"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useUserListModals } from "@/features/userList/model/useUserListModals";

import s from "./user-list-modals.module.scss";
import { Button, Close, Select } from "@honor-ui/inctagram-ui-kit";
import { useState } from "react";

type Props = {
  open: boolean;
};

export const BanUserModal = (props: Props) => {
  const { open } = props;
  const [banReason, setBanReason] = useState("");

  console.log(banReason);

  const { cancel, user, confirmBanUser, optionsReasons } = useUserListModals();

  return (
    <Dialog.Root open={open} onOpenChange={cancel}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content className={s.content}>
          <Dialog.Title className={s.title}>
            <span>Ban user</span>
            <Button onClick={cancel} className={s.headerCancelBtn}>
              <Close />
            </Button>
          </Dialog.Title>
          <div className={s.body}>
            <Dialog.Description className={s.description}>
              Are you sure to ban this user, {user?.userName}?
            </Dialog.Description>
            <Select
              value={banReason}
              onValueChange={setBanReason}
              placeholder={"Reason for ban"}
              options={optionsReasons}
            />
            <div className={s.actionsBtnGroup}>
              <Button onClick={cancel}>No</Button>
              <Button
                className={s.confirm}
                onClick={() => confirmBanUser({ banReason })}
                variant={"outlined"}
              >
                Yes
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
