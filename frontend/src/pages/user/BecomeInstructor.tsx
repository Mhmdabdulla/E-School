import Features from "../../components/user/become-instructor/features";
import HeroSection from "../../components/user/become-instructor/hero-section";
import Header from "../../components/user/home/Header";

const BecomeInstructorPage = () => {
  return (
    <main className="min-h-screen ">
      <Header />
      <HeroSection />
      <Features />
    </main>
  );
};

export default BecomeInstructorPage;
