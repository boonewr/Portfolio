import Link from "next/link";
import ImageSlot from "@/components/ImageSlot";
import Tag from "@/components/Tag";

export default function ProjectCard({ project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block focus-ring rounded-lg">
      <article className="glass-panel h-full rounded-lg p-2 transition duration-300 hover:bg-white/70 dark:hover:border-white/15 dark:hover:bg-white/[0.055]">
        <ImageSlot src={project.image.src} alt={project.image.alt} label={project.image.label} />
        <div className="px-2 pb-3 pt-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-medium text-primary transition-colors group-hover:text-accent-strong">{project.title}</h3>
            <span className="mt-1 text-xs text-faint transition-colors group-hover:text-accent-strong">View</span>
          </div>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-secondary">{project.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
