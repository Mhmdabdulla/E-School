import InstructorApplicationForm from "../../components/user/become-instructor/instructor-application"
import Header from "../../components/user/home/Header"

const InstructorApply = () => {
  return (
      <div className=" pb-10">
        <Header/>
      <div className=" mt-10 mx-auto max-w-4xl">
        <div className="mb-8 text-left">
          <h1 className="text-2xl font-bold tracking-tight">Become a Instructor</h1>
          <p className="mt-2 text-muted-foreground text-sm">Fill out the form below to apply to join our tutoring team.</p>
        </div>
        <InstructorApplicationForm />
      </div>
    </div>
  )
}

export default InstructorApply