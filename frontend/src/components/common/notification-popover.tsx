import {
  Bell,
  Book,
  Calendar,
  Video,
  Award,
  CheckCircle,
  BookOpen,
  DollarSign,
  Check,
  MoreVertical,
  Trash2Icon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {type Notification } from "../../types/notification";
import { getNotificationTimeLabel } from "../../lib/utils/dateUtils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/DropDownMenu"
import { deleteNotificationThunk, markAllNotificationsAsReadThunk, markNotificationAsReadThunk } from "../../redux/thunks/notificationThunk";

function NotificationItem({ notification }: { notification: Notification }) {
  const dispatch = useAppDispatch();

  const handleMarkAsRead = () => {
    dispatch(markNotificationAsReadThunk(notification._id));
  };

  const handleDelete = () => {
    dispatch(deleteNotificationThunk(notification._id));
  };

  const getIcon = () => {
    switch (notification.type) {
      case "course":
        return <Book className="h-4 w-4" />;
      case "assignment":
        return <Calendar className="h-4 w-4" />;
      case "live":
        return <Video className="h-4 w-4" />;
      case "certificate":
        return <Award className="h-4 w-4" />;
      case "achievement":
        return <CheckCircle className="h-4 w-4" />;
      case "purchase":
        return <DollarSign className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4  w-4" />;
    }
  };

  return (
    <div className={`flex gap-3 p-3 border-b ${notification.isRead ? "" : "bg-muted/20"}`}>
     <div className="relative flex h-8 w-8 items-center justify-center rounded-full 
  ${notification.isRead ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'}">
  {getIcon()}
  {!notification.isRead && (
    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-500 border border-white"></span>
  )}
</div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <p className="font-medium text-sm">{notification.title}</p>
          <div className="flex gap-2">
            <span className="text-xs text-muted-foreground block mt-1">
              {getNotificationTimeLabel(notification.createdAt)}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                  <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {!notification.isRead && (
                  <DropdownMenuItem onClick={handleMarkAsRead} className="gap-2">
                    <Check className="h-3 w-3" /> Mark as read
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleDelete} className="gap-2 text-red-600">
                  <Trash2Icon className="h-3 w-3" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{notification.description}</p>
      </div>
    </div>
  );
}

export default function NotificationPopover() {
  const notifications = useAppSelector((state) => state.notification.notifications);
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const dispatch = useAppDispatch();

  const handleMarkAllAsRead = () => {
    dispatch(markAllNotificationsAsReadThunk())
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-black dark:bg-white text-[10px] font-medium text-white dark:text-black">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-2" align="end">
        <div className="flex items-center justify-between border-b p-3">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button onClick={handleMarkAllAsRead} variant="ghost" size="sm" className="text-xs px-2 py-1">
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {notifications.length > 0 ? (
            <div className="flex flex-col">
              {notifications.map((n) => (
                <NotificationItem key={n._id} notification={n} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-muted-foreground text-sm">
              No notifications
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}