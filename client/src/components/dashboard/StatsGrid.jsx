import {
  BookOpen,
  FileText,
  Heart,
  Eye,
} from "lucide-react";

import StatsCard from "./StatsCard";

function StatsGrid({
  published = 0,
  drafts = 0,
  likes = 0,
  views = 0,
}) {
  return (
    <section className="mb-10">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        
        <StatsCard
          title="Published"
          value={published}
          icon={BookOpen}
          color="text-violet-500"
        />

        <StatsCard
          title="Drafts"
          value={drafts}
          icon={FileText}
          color="text-amber-500"
        />

        <StatsCard
          title="Likes"
          value={likes}
          icon={Heart}
          color="text-red-500"
        />

        <StatsCard
          title="Views"
          value={views}
          icon={Eye}
          color="text-cyan-500"
        />

      </div>
    </section>
  );
}

export default StatsGrid;