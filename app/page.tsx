import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import FeaturedProducts from "@/components/featured-products";
import ProductCarousel from "@/components/product-carousel";
import FeaturedBrands from "@/components/featured-brands";
import Editorial from "@/components/editorial";
import CampaignBanner from "@/components/campaign-banner";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <ProductCarousel />
      <FeaturedBrands />
      <Editorial />
      <CampaignBanner />
      <Footer />
    </main>
  );
}
