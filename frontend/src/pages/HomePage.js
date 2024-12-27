import SneakerHero from "../components/sneakers/SneakerHero";
import SneakerCarousel from "../components/sneakers/SneakerCarousel";
import WatchSection from "../components/watches/WatchSection";
import WatchCarousel from "../components/watches/WatchCarousel";
import './HomePage.css';


function HomePage(){
    return(
        <div>
            <SneakerHero />
            <SneakerCarousel />
            <WatchSection />
            <WatchCarousel />

        </div>
    )
}

export default HomePage;