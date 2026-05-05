import Link from "next/link";
import ImageSlot from "@/components/ImageSlot";
import Tag from "@/components/Tag";

export default function ProjectCard({ project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block focus-ring rounded-lg">
      <article className="glass-panel h-full rounded-lg p-2 transition duration-300 hover:border-white/15 hover:bg-white/[0.055]">
        <ImageSlot src={project.image.src} alt={project.image.alt} label={project.image.label} />
        <div className="px-2 pb-3 pt-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-medium text-white transition-colors group-hover:text-blue-300">{project.title}</h3>
            <span className="mt-1 text-xs text-zinc-600 transition-colors group-hover:text-blue-300">View</span>
          </div>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-400">{project.summary}</p>
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
