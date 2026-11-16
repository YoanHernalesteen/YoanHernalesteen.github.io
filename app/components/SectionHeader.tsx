import type { ReactNode } from "react";

interface Props {
  // Préfixe des identifiants : la section s'étiquette avec
  // aria-labelledby="<id>-eyebrow <id>-title".
  id: string;
  eyebrow: string;
  title?: string;
  // Lien à droite du titre (« Toutes les études de cas → »).
  action?: ReactNode;
}

export function SectionHeader({ id, eyebrow, title, action }: Props) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p id={`${id}-eyebrow`} className="eyebrow">
          {eyebrow}
        </p>
        {title && (
          <h2
            id={`${id}-title`}
            className="mt-2 font-display text-3xl leading-tight font-bold md:text-[40px]"
          >
            {title}
          </h2>
        )}
      </div>
      {action}
    </div>
  );
}

// Valeur d'aria-labelledby pour une section qui utilise SectionHeader.
export function sectionLabel(id: string, hasTitle = true): string {
  return hasTitle ? `${id}-eyebrow ${id}-title` : `${id}-eyebrow`;
}
