import Hero from '../components/home/Hero';
import FeatureStrip from '../components/home/FeatureStrip';
import Occasions from '../components/home/Occasions';
import FeaturedBouquets from '../components/home/FeaturedBouquets';
import HowToOrder from '../components/home/HowToOrder';
import ClosingCta from '../components/home/ClosingCta';

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <Occasions />
      <FeaturedBouquets />
      <HowToOrder />
      <ClosingCta />
    </>
  );
}
