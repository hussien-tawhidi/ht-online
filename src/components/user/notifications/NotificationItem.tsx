"use client";

import { motion } from "framer-motion";
import { UserNotification } from "../data";
import { itemVariants } from "./variants";
import { CiClock1 } from "react-icons/ci";

interface NotificationItemProps {
  notification: UserNotification;
  onMarkRead: (id: number) => void;
  onMarkUnread: (id: number) => void;
  onDelete: (notification: UserNotification) => void;

}

export default function NotificationItem({
  notification,
  onMarkRead,
  onMarkUnread,
  onDelete,
}: NotificationItemProps) {
  const { id, title, message, date, read } = notification;

  return (
    <motion.li
      layout
      initial='hidden'
      animate='visible'
      exit='exit'
      variants={itemVariants}
      transition={{ duration: 0.4 }}
      className={`p-5 rounded-xl border my-3 transition-all duration-300 transform hover:scale-105 
        ${
          read ? "bg-[#fcfcfc] border-darker/5" : "bg-[#fff] border-darker/20"
        }`}>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-3'>
        <div
          className='flex-1 flex items-start gap-3'
          onClick={() => (read ? onMarkUnread(id) : onMarkRead(id))}>
          {/* Delete button */}
          <motion.button
            onClick={() => onDelete(notification)}
            aria-label={`حذف اعلان: ${title}`}
            title='حذف اعلان'
            className='font-bold text-2xl'>
            &times;
          </motion.button>

          <div>
            <div className='flex flex-col gap-1'>
              <h3
                className={`text-lg font-bold ${
                  read ? "text-darker/50" : "text-darker"
                }`}>
                {title}
              </h3>
              <span className='text-tusi'>{notification.sender}</span>
            </div>

            <p
              className={`mt-2 text-sm leading-relaxed ${
                read ? "text-darker/50" : "text-darker/80"
              }`}>
              {message}
            </p>
          </div>
        </div>

        <div className='flex flex-col gap-2 items-center'>
          <small className='text-darker/50 flex items-center gap-1 text-xs'>
            <CiClock1 />
            {date}
          </small>
        </div>
      </div>
    </motion.li>
  );
}
