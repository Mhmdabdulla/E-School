import { useState } from "react";
import { Button } from "../../ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { type EnrolledCourse } from "../../../types/enrollment";
import { addReview as addNewReview } from "../../../services/reviewService";
import { toast } from "sonner";
import ReviewDialog from "../course-review/course-review-dialog";
// import { applyForCertificate, downloadCertificate } from "@/services/certificateService";
import { useAppDispatch } from "../../../redux/store";
import { addReview } from "../../../redux/slices/reviewSlice";

interface CourseHeaderProps {
  title: string;
  sections: number;
  lectures: number;
  duration: string;
  enrollment: EnrolledCourse;
}

export function CourseHeader({
  title,
  sections,
  lectures,
  duration,
  enrollment,
}: CourseHeaderProps) {
  const navigate = useNavigate();
  const handleBackClick = () => navigate(-1);
  const [dialogOpen, setDialogOpen] = useState(false)
  const dispatch = useAppDispatch()


  const handleSubmit = async(rating:number, review:string) => {
    try {
        const data = await addNewReview(enrollment.courseId as string, rating.toString(), review.trim())
        toast.success(data.message)
        console.log(data)
        dispatch(addReview(data.review))

        console.log('Submited for adding review')

    } catch (error:any) {
        toast.warning(error.message)
    }
  };

  const handleDownloadCertificate = async () => {
    try {
      // const data = await applyForCertificate(enrollment.courseId as string)
      // console.log(data)
      //  await downloadCertificate(data.certificateUrl)
    console.log("download certificate clicked")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <Link to="#" className="mt-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleBackClick}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-lg font-medium leading-tight">{title}</h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
            <span>{sections} Sections</span>
            <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground"></span>
            <span>{lectures} lectures</span>
            <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground"></span>
            <span>{duration}</span>
          </div>
        </div>
      </div>
      {enrollment.completed && (
        <div className="flex gap-3">
        <Button variant="outline" size="sm" onClick={()=> setDialogOpen(true)}>Write A Review</Button>
        <Button variant="secondary" size="sm" className="gap-2" onClick={handleDownloadCertificate}>
          <Download/>
          Certificate 
        </Button>
        </div>
      )}
      {
        enrollment.completed && dialogOpen &&
        <ReviewDialog 
        isOpen={true}
        onOpenChange={()=> setDialogOpen(prev => !prev)} 
        onSubmit={(rating, review) => handleSubmit(rating, review)}
        initialRating={0}
        initialReview={""}
        mode="create"
        />

      }

      {/* {enrollment.completed && (
        <ReviewDialog 
        isOpen={i}
        onOpenChange={}
        />
        // <Dialog>
        //   <DialogTrigger asChild>
        //     <Button variant="outline">Write A Review</Button>
        //   </DialogTrigger>
        //   <DialogContent className="sm:max-w-md">
        //     <DialogHeader>
        //       <DialogTitle>Write a Review</DialogTitle>
        //     </DialogHeader>

        //     <div className="flex flex-col gap-4 py-2">
        //       <div>
        //         <Label className="mb-4">Rating</Label>
        //         <div className="flex items-center gap-1 mt-1">
        //           {[1, 2, 3, 4, 5].map((star) => (
        //             <Star
        //               key={star}
        //               className={`w-5 h-5 cursor-pointer ${
        //                 star <= rating
        //                   ? "fill-yellow-400 stroke-yellow-400"
        //                   : "stroke-muted"
        //               }`}
        //               onClick={() => setRating(star)}
        //             />
        //           ))}
        //         </div>
        //       </div>

        //       <div>
        //         <Label className="mb-4">Review</Label>
        //         <Textarea
        //           placeholder="Share your thoughts..."
        //           value={review}
        //           onChange={(e) => setReview(e.target.value)}
        //           rows={4}
        //         />
        //       </div>
        //     </div>

        //     <DialogFooter className="gap-2">
        //       <DialogClose asChild>
        //         <Button variant="outline">Cancel</Button>
        //       </DialogClose>
        //       <Button onClick={handleSubmit} className="flex items-center gap-2">
        //         Submit
        //         <SendHorizontal size={12} strokeWidth={1}/>
        //         </Button>
        //     </DialogFooter>
        //   </DialogContent>
        // </Dialog>
        
      )} */}
    </div>
  );
}