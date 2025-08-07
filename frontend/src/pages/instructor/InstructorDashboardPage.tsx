import type React from "react";
import { useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  DollarSign,
  Layers,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Sidebar } from "../../components/instructor/common/Sidebar";
import { RevenueStats } from "../../components/instructor/earnings/revenue-stats";
import {type Wallet } from "../../types/wallet";
import { fetchInstructorWallet } from "../../services/earningService";
import { RevenueChart } from "../../components/instructor/earnings/revenue-chart";
// import { fetchInstructorRating } from "@/services/reviewService";
import { RatingCard } from "../../components/instructor/dashboard/rating-card";
import { type InstructorRating } from "../..//types/review";
import { type InstructorStats } from "../../types/enrollment";
import { fetchInstructorEnrollemtStats } from "../../services/enrollmentService";
import { fetchActiveCourseCount } from "../../services/courseService";

const InstructorDashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [walletData, setWalletData] = useState<Wallet | null>(null);
  const [ratings, setRatings] = useState<InstructorRating | null>(null);
  const [enrollmentStats, setEnrollmentStats] = useState<InstructorStats>()
  const [activeCourse, setActiveCourse] = useState<string>("0")

  useEffect(() => {
    getDahsboardData();
  }, []);

  const getDahsboardData = async () => {
    try {
      const walletData = await fetchInstructorWallet();
      setWalletData(walletData.wallet);
      // const ratingData = await fetchInstructorRating();
      // setRatings(ratingData.instructorRating)
      setRatings({
  averageRating: 4.6,
  totalReviews: 82,
  breakdown: [
    { rating: 5, count: 60, percentage: 73.2 },
    { rating: 4, count: 15, percentage: 18.3 },
    { rating: 3, count: 5, percentage: 6.1 },
    { rating: 2, count: 1, percentage: 1.2 },
    { rating: 1, count: 1, percentage: 1.2 },
  ]
})
      const enrollmentData = await fetchInstructorEnrollemtStats()
      setEnrollmentStats(enrollmentData.enrollmentStats)
      const activeCourseData = await fetchActiveCourseCount()
      setActiveCourse(activeCourseData.activeCourses)

    } catch (error) {
      console.log(error);
    } 
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex flex-1 items-center gap-4">
            <div>
              <h2 className="text-sm font-medium">Good Morning</h2>
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search"
                className="h-9 w-64 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  3
                </span>
              </button>
            </div>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 pb-16">
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard icon={<Users className="h-5 w-5 text-primary" />} title={enrollmentStats?.studentCount.toString() as string} subtitle="Students" />
            <StatsCard icon={<BookOpen className="h-5 w-5 text-primary" />} title={activeCourse} subtitle="Online Courses" />
            <StatsCard
              icon={<DollarSign className="h-5 w-5 text-primary" />}
              title={`₹${walletData?.balance.toFixed(2)}`}
              subtitle="USD Total Earning"
            />
            <StatsCard icon={<Layers className="h-5 w-5 text-primary" />} title={enrollmentStats?.coursesSold.toString() as string} subtitle="Course Sold" />
          </div>
          <div className="mt-5">
            <RevenueStats wallet={walletData} />
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {ratings && (
              <RatingCard
                averageRating={ratings?.averageRating}
                starPercentages={Object.fromEntries(
                  ratings?.breakdown.map(({ rating, percentage }) => [rating, percentage])
                )}
                totalReviews={ratings.totalReviews}
              />
            )}
            <RevenueChart />
          </div>
        </main>
      </div>
    </div>
  );
};

function StatsCard({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold">{title}</p>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export default InstructorDashboardPage;