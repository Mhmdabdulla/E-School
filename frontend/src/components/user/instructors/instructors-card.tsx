import { SendIcon } from "lucide-react";
import { Button } from "../../ui/button";
import type { IInstructor } from "../../../types/instructor";
import {type IUser } from "../../../types/user";
import { cn } from "../../../lib/utils/className";
// import { createChat } from "@/services/chatService";
// import { useNavigate } from "react-router-dom";

interface InstructorCardProps {
  instructor: IInstructor;
}

export function InstructorCard({ instructor }: InstructorCardProps) {
  const instructorWithDetails = instructor.userId as IUser;
//   const navigate = useNavigate()

  const handleConnectClick = async() =>{
    try {
        // const data = await createChat(instructorWithDetails._id)
        // console.log(data)
        // navigate(`/user/messages/${data.chat._id}`)
        console.log('user trying to connect to instructor')
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className={cn("flex flex-col border rounded-lg p-4 shadow-sm transition hover:shadow-md")}>
      <div className="relative w-full aspect-square overflow-hidden rounded-md mb-3">
        <img
          src={instructorWithDetails.profileImageUrl || "/placeholder.svg"}
          alt={instructorWithDetails.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <h3 className="font-semibold text-lg">{instructorWithDetails.name}</h3>
      <p className="text-muted-foreground text-sm mb-2">{instructorWithDetails.title}</p>

      <Button onClick={handleConnectClick} variant="outline" size={"sm"} className=" mt-auto flex justify-evenly gap-4 text-sm">
        Connect
        <SendIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}