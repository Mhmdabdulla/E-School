import mongoose, { Schema, Types, Document } from "mongoose";

export interface IMessage extends Document {
  chatId: Types.ObjectId | string;
  senderId: Types.ObjectId | string;
  body?: string;
  readBy: (Types.ObjectId | string)[];
  attachments?: { url: string; mime: string; size: number }[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    chatId: { type: Schema.Types.ObjectId, ref: "Chat", required: true, index: true },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    body: { type: String, maxlength: 2000 },
    readBy: {
      type: [{ type: Schema.Types.Mixed, ref: "User" }], 
      default: function () {
        return [this.senderId]; 
      }
    },
    attachments: [
      {
        url: String,
        mime: String,
        size: Number,
      },
    ],
  },
  { timestamps: true }
);

MessageSchema.index({ chatId: 1, createdAt: 1 });

export const Message = mongoose.model<IMessage>("Message", MessageSchema);