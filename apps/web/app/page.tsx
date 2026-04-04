import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      <Hero />
      
      {/* Additional sections can be added here */}
      
      {/* Footer (Placeholder for future) */}
      <footer className="footer-placeholder" />
    </main>
  );
}
