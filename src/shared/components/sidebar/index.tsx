'use client'

import {
  CreditCardOutline,
  ImageOutline,
  LogOutOutline,
  PersonOutline,
  TrendingUp,
  Typography
} from '@honor-ui/inctagram-ui-kit'
import {Path} from "@/shared/const/path";
import {logout} from "@/features/sign-in/useAuth";

import s from './sidebars.module.scss'
import {usePathname, useRouter} from 'next/navigation';

export const Sidebar = () => {
  const router = useRouter()
  const pathname = usePathname();

  const isActivePath = (path: string) => pathname === path

    return (
      <div className={s.box}>
        <div className={s.content}>
          <ul>
            <Typography
              as={'li'}
              variant={'medium_text14'}
              onClick={() => router.push(Path.Admin.UserList)}
              className={isActivePath(Path.Admin.UserList) ? s.active : ''}
            >
              <PersonOutline /> Users list
            </Typography>
            <Typography
              as={'li'}
              variant={'medium_text14'}
              onClick={() => router.push(Path.Admin.Statistics)}
              className={isActivePath(Path.Admin.Statistics) ? s.active : ''}
            >
              <TrendingUp /> Statistics
            </Typography>
            <Typography
              as={'li'}
              variant={'medium_text14'}
              onClick={() => router.push(Path.Admin.PaymentsList)}
              className={isActivePath(Path.Admin.PaymentsList) ? s.active : ''}
            >
              <CreditCardOutline /> Payments list
            </Typography>
            <Typography
              as={'li'}
              variant={'medium_text14'}
              onClick={() => router.push(Path.Admin.PostsList)}
              className={isActivePath(Path.Admin.PostsList) ? s.active : ''}
            >
              <ImageOutline /> Posts list
            </Typography>
            <Typography as={'li'} variant={'medium_text14'} onClick={() => logout()}>
              <LogOutOutline /> Log Out
            </Typography>
          </ul>
        </div>
      </div>
    )

}
