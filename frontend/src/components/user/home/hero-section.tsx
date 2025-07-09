import { motion } from 'framer-motion';
import { Button } from '../../ui/button';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const, // ⬅ assert this is a valid easing type
    },
  },
};


  return (
    <section className="px-[5%] bg-transparent">
      <motion.div
        className="container mx-auto grid items-center gap-8 py-16 md:grid-cols-2 md:py-20 lg:gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col space-y-6">
          <motion.h1
            className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground"
            variants={itemVariants}
          >
            Master Skills with
            <span className="block text-muted-foreground">Expert-Led Courses</span>
          </motion.h1>
          <motion.p
            className="max-w-[600px] text-lg text-muted-foreground leading-relaxed"
            variants={itemVariants}
          >
            Discover top-tier online courses and learn from industry experts anytime, anywhere. Your journey to success starts here.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button
              asChild
              className="px-8 py-3 bg-foreground text-background hover:bg-muted-foreground hover:text-background rounded-full transition-colors duration-300"
            >
              <a href="/courses">Start Learning</a>
            </Button>
          </motion.div>
        </div>
        <motion.div
          className="hidden md:block relative h-[400px] w-full"
          variants={itemVariants}
        >
          {/* <div className="absolute inset-0 bg-muted rounded-2xl transform rotate-3"></div> */}
          <div className="absolute inset-4 bg-background rounded-xl transform  flex items-center justify-center ">
            <div className="text-center">
              <motion.div
                className="text-3xl font-bold text-foreground"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              >
                10,000+ Courses
              </motion.div>
              <p className="text-muted-foreground mt-2">Explore a world of knowledge</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;