import { useEffect, useState } from "react";
import { Mail, MailOpen } from "lucide-react";
import { getMessages, markMessageAsRead } from "../../services/messageService";
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

  return (
    <div className="mr-7 ml-7 rounded-md border border-gray-300 sm:mx-auto sm:max-w-sm">
      <button
        type="button"
        disabled={!hasMessages}
        aria-expanded={showMessages}
        onClick={() => setIsOpen((previous) => !previous)}
        className="flex w-full items-center justify-between p-5 text-left enabled:cursor-pointer disabled:cursor-default disabled:text-gray-500"
      >
        {hasMessages ? "Meddelanden:" : "Du har inga meddelanden"}

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
        <div className="space-y-4 px-5 pb-5">
          {messages.map((message) => (
            <div key={message.message_id}>
              <button
                type="button"
                aria-expanded={openMessageId === message.message_id}
                onClick={async () => {
                  setOpenMessageId((previous) =>
                    previous === message.message_id ? null : message.message_id,
                  );

                  if (message.is_read === 0) {
                    try {
                      await markMessageAsRead(message.message_id);

                      setMessages((previous) =>
                        previous.map((item) =>
                          item.message_id === message.message_id
                            ? { ...item, is_read: 1 }
                            : item,
                        ),
                      );
                    } catch (error) {
                      console.error(error);
                    }
                  }
                }}
                className="cursor-pointer text-left transition-colors hover:text-[#1F5C73]"
              >
                {message.message}
              </button>

              {openMessageId === message.message_id && (
                <div className="mt-2 rounded-md border border-gray-300 p-3">
                  <p className="whitespace-pre-wrap">{message.message}</p>
                </div>
              )}

              <p className="text-gray-500">
                Datum:{" "}
                {new Date(message.created_at).toLocaleDateString("sv-SE")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReportHistory;
