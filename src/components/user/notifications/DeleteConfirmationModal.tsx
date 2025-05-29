"use client";

import { motion, AnimatePresence } from "framer-motion";
import { UserNotification } from "../data"; // Adjust path if needed
import { Dispatch, SetStateAction } from "react";

interface DeleteConfirmationModalProps {
  deleteCandidate: UserNotification | null;
  setDeleteCandidate: Dispatch<SetStateAction<UserNotification | null>>;
  deleteNotification: (id: number) => void;
}

export default function DeleteConfirmationModal({
  deleteCandidate,
  setDeleteCandidate,
  deleteNotification,
}: DeleteConfirmationModalProps) {
  return (
    <AnimatePresence>
      {deleteCandidate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className='bg-white rounded-xl p-6 max-w-sm w-full shadow-lg text-right'
            dir='rtl'
            role='dialog'
            aria-modal='true'
            aria-labelledby='modal-title'
            aria-describedby='modal-desc'>
            <h2 id='modal-title' className='text-xl font-semibold mb-4'>
              تأیید حذف اعلان
            </h2>
            <p id='modal-desc' className='mb-6 text-sm text-darker/80'>
              آیا از حذف اعلان 
              <span className='font-bold'>{deleteCandidate.title}</span> مطمئن
              هستید؟
            </p>
            <div className='flex justify-end gap-4'>
              <button
                onClick={() => setDeleteCandidate(null)}
                className='px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm'>
                لغو
              </button>
              <button
                onClick={() => deleteNotification(deleteCandidate.id)}
                className='px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 text-sm'>
                حذف
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
