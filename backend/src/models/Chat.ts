import mongoose, { Schema, Document } from "mongoose";

export interface IChat extends Document {
  participants: string[];
  isGroup: boolean;
  groupName?: string;
  lastMessage?: string
  unreadCount: { userId: string; count: number } [];
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema = new Schema<IChat>(
  {
    participants: [
      { type: Schema.Types.ObjectId, ref: "User", required: true }
    ],
    isGroup: { type: Boolean, default: false },
    groupName: { type: String },
    lastMessage:{ type: Schema.Types.ObjectId, ref: "Message"},
    unreadCount:[]
  },
  { timestamps: true }
);

export const Chat = mongoose.model<IChat>("Chat", ChatSchema);