"use client";

import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { initialNotifications, UserNotification } from "../data";
import NotificationItem from "./NotificationItem";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import Pagination from "./Pagination";
import NotificationToolbar from "./NotificationToolbar";

const ITEMS_PER_PAGE = 3;

export default function Notifications() {
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [notifications, setNotifications] =
    useState<UserNotification[]>(initialNotifications);
  const [deleteCandidate, setDeleteCandidate] =
    useState<UserNotification | null>(null);

  const filteredNotifications = useMemo(() => {
    if (filter === "read") return notifications.filter((n) => n.read);
    if (filter === "unread") return notifications.filter((n) => !n.read);
    return notifications;
  }, [notifications, filter]);

  const totalPages = Math.ceil(filteredNotifications.length / ITEMS_PER_PAGE);

  const currentNotifications = filteredNotifications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function markRead(id: number) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  function markUnread(id: number) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: false } : n))
    );
  }

  function clearAll() {
    setNotifications([]);
  }

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function confirmDelete(notification: UserNotification) {
    setDeleteCandidate(notification);
  }

  function deleteNotification(id: number) {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setDeleteCandidate(null);
  }

  return (
    <div className='max-w-3xl mx-auto p-6 bg-white rounded shadow-md'>
      <h1 className='text-3xl font-bold mb-6'>اعلان‌ها</h1>

      <NotificationToolbar
        filter={filter}
        setFilter={setFilter}
        setCurrentPage={setCurrentPage}
        markAllRead={markAllRead}
        clearAll={clearAll}
        notifications={notifications}
      />

      {currentNotifications.length === 0 ? (
        <p className='text-center text-gray-500 py-10'>
          No notifications found.
        </p>
      ) : (
        <ul>
          <AnimatePresence>
            {currentNotifications.map((notif) => (
              <NotificationItem
                key={notif.id}
                notification={notif}
                onMarkRead={markRead}
                onMarkUnread={markUnread}
                onDelete={confirmDelete}
           
              />
            ))}
          </AnimatePresence>
        </ul>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Confirmation Modal */}
      <DeleteConfirmationModal
        deleteCandidate={deleteCandidate}
        setDeleteCandidate={setDeleteCandidate}
        deleteNotification={deleteNotification}
      />
    </div>
  );
}
