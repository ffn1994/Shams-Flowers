import PageMeta from '../components/PageMeta';
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
      <PageMeta
        path="/"
        description="شمس فلاورز — تنسيق استقبالات مواليد وتخرج وحفلات، وباقات ورد طبيعي وصناعي. الطلب على الواتساب وتوصيل لجميع مناطق الكويت."
      />
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
