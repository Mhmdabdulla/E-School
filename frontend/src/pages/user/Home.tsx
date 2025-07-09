import CategorySection from '../../components/user/home/category-section'
import Header from '../../components/user/home/Header'
import HeroSection from '../../components/user/home/hero-section'

const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col">
        <Header/>
    <main className=''>
        <HeroSection/>
        <CategorySection/>
    </main>
    </div>
  )
}

export default HomePage