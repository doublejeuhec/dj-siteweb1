import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { roleAbbreviations } from "@/data/promos";
import Image from "next/image";

interface MemberCardProps {
  member: {
    src: string;
    title: string;
    poste: string;
    roles: Record<string, string | number>;
    commentaireOR?: string;
  };
  index: number;
}

export default function MemberCard({ member, index }: MemberCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-200 group">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={member.src}
          alt={member.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          quality={80}
          loading={index < 4 ? "eager" : "lazy"}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        />
      </div>
      <CardHeader className="pb-1 pt-3">
        <CardTitle className="text-base font-bold">{member.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="font-medium text-red-600 text-sm mb-2 border-b border-red-100 pb-2">
          {member.poste}
        </p>

        <div className="space-y-1 mb-2">
          <p className="text-xs font-semibold text-gray-700">Rôles :</p>
          <ul className="text-xs text-gray-600 space-y-1">
            {Object.entries(member.roles).map(([abbr, role], idx) => (
              <li key={idx} className="pl-2 border-l-2 border-red-200">
                <span className="font-medium text-red-800">
                  {roleAbbreviations[abbr] || abbr}
                </span>{" "}
                : {typeof role === "string" ? role : String(role)}
              </li>
            ))}
          </ul>
        </div>

        {member.commentaireOR && (
          <div className="text-xs italic text-gray-500 mt-3 pt-2 border-t border-gray-100">
            <span className="font-medium text-red-700">On raconte </span>
            {member.commentaireOR}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
