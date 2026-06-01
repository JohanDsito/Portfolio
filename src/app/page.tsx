"use client";
import { ContactSection } from "@/src/components/ContactSection";
import { ExperienceSection } from "@/src/components/ExperienceSection";
import { MainContent } from "@/src/components/MainContent";
import { Navigation } from "@/src/components/Navigation";
import { PersonalExperiences } from "@/src/components/PersonalExperiences";
import { ProjectsSection } from "@/src/components/ProjectSection";
import { ScrollProgress } from "@/src/components/ScrollProgress";
import { SkillsSection } from "@/src/components/SkillSection";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <main className="min-h-screen bg-surface dark:bg-surface">
        <Navigation />
        <MainContent />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <PersonalExperiences />
        <ContactSection />
      </main>
    </>
  );
}
