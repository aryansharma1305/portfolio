import React from 'react';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ServicesSection from './sections/ServicesSection';
import ProjectsSection from './sections/ProjectsSection';
import FooterSection from './sections/FooterSection';
import CustomCursor from './components/CustomCursor';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: '' };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: '#ff6b6b', padding: '3rem', backgroundColor: '#0C0C0C', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h2 style={{ marginBottom: '1rem' }}>Runtime Error</h2>
          <pre style={{ whiteSpace: 'pre-wrap', opacity: 0.8 }}>{this.state.error}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <CustomCursor />
      <div style={{
        backgroundColor: '#0C0C0C',
        fontFamily: "'Kanit', sans-serif",
        overflowX: 'hidden',
      }}>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ServicesSection />
        <ProjectsSection />
        <FooterSection />
      </div>
    </ErrorBoundary>
  );
}

export default App;
