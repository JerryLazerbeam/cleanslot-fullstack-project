import { useEffect, useState } from "react";
import { Mail, MailOpen, ChevronDown } from "lucide-react";
import {
  getMessages,
  markMessageAsRead,
  notifyMessagesChanged,
} from "../../services/messageService";
import type { Message } from "./reportTypes";

function ReportHistory() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [openMessageId, setOpenMessageId] = useState<number | null>(null);

  useEffect(() => {
    getMessages()
      .then((data) => setMessages(data))
      .catch((error) => console.error(error));
  }, []);

  const unreadCount = messages.filter(
    (message) => message.is_read === 0,
  ).length;

  const hasMessages = messages.length > 0;
  const showMessages = hasMessages && isOpen;

  async function handleOpenMessage(message: Message) {
    setOpenMessageId((previous) =>
      previous === message.message_id ? null : message.message_id,
    );

    if (message.is_read !== 0) return;

    try {
      await markMessageAsRead(message.message_id);

      setMessages((previous) =>
        previous.map((item) =>
          item.message_id === message.message_id
            ? { ...item, is_read: 1 }
            : item,
        ),
      );

      // Navbaren uppdaterar sin notis
      notifyMessagesChanged();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mr-7 ml-7 rounded-md border border-gray-300 sm:mx-auto sm:max-w-sm">
      <button
        type="button"
        disabled={!hasMessages}
        aria-expanded={showMessages}
        onClick={() => setIsOpen((previous) => !previous)}
        className="flex w-full items-center justify-between p-5 text-left enabled:cursor-pointer disabled:cursor-default disabled:text-gray-500"
      >
        {hasMessages ? "Meddelanden" : "Du har inga meddelanden"}

        <span className="relative">
          {hasMessages &&
            (showMessages ? (
              <MailOpen className="text-[#1F5C73]" />
            ) : (
              <Mail className="text-[#1F5C73]" />
            ))}

          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-semibold text-white">
              {unreadCount}
            </span>
          )}
        </span>
      </button>

      {showMessages && (
        <ul className="divide-y divide-gray-200 border-t border-gray-200 dark:divide-gray-700 dark:border-gray-700">
          {messages.map((message) => {
            const isUnread = message.is_read === 0;
            const isExpanded = openMessageId === message.message_id;

            return (
              <li key={message.message_id}>
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() => handleOpenMessage(message)}
                  className="flex w-full cursor-pointer items-start gap-3 px-5 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
                >
                  <span
                    className={`mt-2 h-2 w-2 shrink-0 rounded-full ${
                      isUnread ? "bg-red-600" : "bg-transparent"
                    }`}
                    aria-label={isUnread ? "Oläst" : undefined}
                  />

                  <span className="flex-1 min-w-0">
                    <span
                      className={`block truncate ${
                        isUnread ? "font-semibold" : ""
                      }`}
                    >
                      {/* Äldre meddelanden saknar rubrik – visa början av texten */}
                      {message.title || message.message}
                    </span>
                    <span className="block text-xs text-gray-500">
                      {new Date(message.created_at).toLocaleDateString("sv-SE")}
                    </span>
                  </span>

                  <ChevronDown
                    size={18}
                    className={`mt-1 shrink-0 text-gray-400 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isExpanded && (
                  <p className="whitespace-pre-wrap break-words px-5 pb-4 pl-10 text-sm">
                    {message.message}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ReportHistory;
