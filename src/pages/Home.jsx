import Hero from '../components/home/Hero';
import FeatureStrip from '../components/home/FeatureStrip';
import FeaturedPackages from '../components/home/FeaturedPackages';
import Occasions from '../components/home/Occasions';
import TrustSection from '../components/home/TrustSection';
import HowToOrder from '../components/home/HowToOrder';
import ClosingCta from '../components/home/ClosingCta';

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <FeaturedPackages />
      <Occasions />
      <TrustSection />
      <HowToOrder />
      <ClosingCta />
    </>
  );
}
