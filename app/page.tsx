import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { getAllCompanions, getRecentSession } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import React from "react";


export const dynamic = "force-dynamic";

const Page =async () => {
  const companions = await getAllCompanions({limit: 3});
  const recentSessionCompanions = await getRecentSession(10);

  return (
    <main className="gradient-bg-welcome">
      <h1 className="text-white">Popular Companions </h1>
      <section className="home-section">
  
        {companions.map((sessions:SupaCompanion) => (
           <CompanionCard 
           key={sessions.id}
        {...sessions}
        color={getSubjectColor(sessions.subject)}
        />

        ))}
        
      </section>
      <section className="home-section">
        <CompanionsList 
        title="Recently completed sessions"
        companions={recentSessionCompanions}
        classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
